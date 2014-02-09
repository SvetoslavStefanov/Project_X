<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ErrorException
 *
 * @author svetlio
 */
class ErrorsException extends Exception
{
    public $called_class;
    
    public function __construct($obj)
    {
        
        foreach($obj->errors as $key => $value){
            $this->logError($value);
        }
        //слага информация в сесиина променлива, която се ще улови от view-то
        //$this->setInfoIntoSession($obj);
        
        $url = $_SERVER['HTTP_REFERER'];
        $disp = new \Dispatcher("SignUp", "up");
        $disp->dispatch($url);
    }
    
    protected function logError($err_msg){
        preg_replace("/#{1}[0-9]/s", "\n", $this->getTraceAsString());
        
        $this->model = new \ErrorsExceptionModel;
        $info = array(
            'msg' => $err_msg,
            'time' => time(),
            'user' => '',
            'ip' => $_SERVER['REMOTE_ADDR'],
            'where' => $this->getFile(),
            'sys_msg' => $this->getTraceAsString()
        );
        
        $this->model->save($info);
    }
    
    protected function setInfoIntoSession($obj){
        $class_name = \get_class($obj);

        $_SESSION['model_info'] = array(
            strtolower($class_name),  
            $obj->attributes,
            'errors' => $obj->errors
                );
    }
}
