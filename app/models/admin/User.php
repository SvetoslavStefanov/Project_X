<?php
/**
 * Description of User
 *
 * @author svetlio
 */
class admin_User extends \ActiveRecord {
    public static $table = 'user';
    static $columns = array(
        'username',
        'password',
//        'info',
//        'cookie',
        'email',
        'selected_lang'
        );
    
    protected function validate(){
        //Validator::validate($this->info, "info", array("textChars" => "\'\",0-9.\-()!<>"));
//        Validator::validate($this->real_name, 'real_name', array("textChars"=> '\,\.()0-9-\_\:\'\"'));
        /*if(empty(\Validator::$errors)){
            if($obj = $this->find(array('where' => array('username' => $this->username, 'id' => array('!=' => $this->id)))))
                    Validator::addError("username", "Името е вече заето");
        }*/
        
//        if(empty(\Validator::$errors)){
//            if($obj = $this->plugin['aUser']->find(array('where' => array('email' => $this->email, 'relation_id' => array("!=" => $this->id)))))
//                    Validator::addError("email", "E-mail адресът е вече зает");
//        }
         
//        if(empty(Validator::$errors) && $this->new_password != null){
//            $this->password = Sign::crypty($this->username, $this->new_password);
//        }
//
//        $this->real_name = \htmlentities($this->real_name, ENT_QUOTES | ENT_IGNORE, "UTF-8");
    }
    
    protected function createValidate(){
//        Validator::validate($this->real_name, 'real_name', array("textChars"=> '\,\.()0-9-\_\:\'\"'));
        if(empty(\Validator::$errors) && strlen($this->username) > 1){
            $obj_username = $this->find(array('where' => array('username' => $this->username)));

            if($obj_username){
                Validator::addError("username", "Името е заето");
            }
        }

        if($this->find(array('where' => array('email' => $this->email)))){
            Validator::addError("email", "Имейлът е регистриран");
        }

        if(empty(Validator::$errors) && $this->password != null){
            $this->password = Sign::crypty($this->username, $this->password);
        }
//        $this->real_name = \htmlentities($this->real_name, ENT_QUOTES | ENT_IGNORE, "UTF-8");
//        $this->date = time();
//        $this->cookie = genereteCode();
    }
}