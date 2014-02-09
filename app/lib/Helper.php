<?php
/**
 * Description of Helper
 *in views:
 *      How to load helper ?
 * <?=$helper->helper_name?>
 * 
 *      How to load helper with argument ?
 * <?$helper->helper_name = 'your_argument'?>
 * <?=$helper->helper_name?>
 * --- attention in examples above  in the first line there aren't ' = ' after ' <? '! This is important !
 * 
 *      How to load helper with more than one argument ?
 * <?$helper->helper_name = array('first_argument', 'second_Argument')?>
 * <?=$helper->helper_name?>
 * --- attention in examples above  in the first line there aren't ' = ' after ' <? '! This is important !
 * 
 * If you wan't to change the extension ( the default is .php ) use 
 * <?$helper->setExt('html');?>
 * <?=$helper->name?>
 * 
 * You can't load one helper more than one time !
 * @author svetlio
 */
class Helper {
    protected $ext = '.php';
    protected $helpers_dir = '';
    protected $loaded_helpers = array();

    public function setExt($ext){
        $this->ext = '.'.$ext;
    }

    private function validate($helper_name){
        if(!file_exists($this->helpers_dir))
                return false;
        if(in_array($helper_name, $this->loaded_helpers))
            return false;
        
        return true;
    }

    protected function loadHelper($name){
        $this->helpers_dir =  VIEWS_DIR."/".View::$tpl."/helpers/".$name.$this->ext;
        if(!$this->validate($name))
                return false;
        $this->loaded_helpers[] = $name;
        include_once $this->helpers_dir;
        
        return true;
    }
    
    public function __set($name, $value) {
        if($this->loadHelper($name)){
            if(is_array($value)){
                $this->$name = call_user_func_array($name, $value);
            }else{
                $this->$name = call_user_func($name, $value);
            }
        }else{
            return $this->$name = 'Няма такъв хелпър с име: '.$name;
        }
    }

    public function __get($name) {
        if(!preg_match("/_{1}/", $name)){
            $new_name = explode('_', $name);
            d($name);
        }
        if($this->loadHelper($name)){
            $this->$name = $name();
        }else{
            return $this->$name = 'Няма такъв хелпър с име: '.$name;
        }
    }
}

?>
