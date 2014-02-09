<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author svetlio
 */
class admin_User extends \ActiveRecord {
    public static $table = 'users';
    static $columns = array(
        'real_name', 
        'username', 
        'password',
        'cookie', 
        'level',
        'active',
        'ip',
        'email',
        'sub'
        );
    
    static $addition_info = array(
        'relation_id',
        'date' ,
        'email',
        'show_email',
        'country', 
        'city', 
        'sub',
        'address1',
        'address2',
        'post_code',
        'phone',
        'info',
        'pic',
        'fb_page',
        'own_page',
        'tw_page',
        'gplus_page',
        'city_friend',
        'country_friend',
        'flickr_page',
        'linkedin_page',
        'youtube_page',
        'on_map',
        'map_x',
        'map_y',
        'unique_code'
    );
    
    public $new_password;
    
    protected function destroyPicValidate(){

    }
    
    public function __set($key, $value){
            if (!in_array($key, static::$columns) && !in_array($key, static::$addition_info)){
                    throw new Exception("Invalid column name - {$key} given for " . get_class($this));
            }

            return $this->attributes[$key] = $value;
    }
    
    public function __get($key){
        if (!in_array($key, static::$columns) && !in_array($key, static::$addition_info)){
            throw new Exception("Invalid column name - {$key} given for " . get_class($this));
        }
        
        if(!isset($this->attributes[$key]))
            return $this->plugin['aUser']->$key;
        else
            return $this->attributes[$key];
    }
    
    protected function validate(){
        $this->info = str_replace("&nbsp;", "", $this->info);
        $this->info = strip_tags($this->info, "<p><h1><h2><h3><h4><h5><h6><ol><ul><li><img><span><hr><br><b><i><a>");
        //FormValidator::validate($this->info, "info", array("textChars" => "\'\",0-9.\-()!<>"));
        FormValidator::validate($this->real_name, 'real_name', array("textChars"=> '\,\.()0-9-\_\:\'\"'));
        /*if(empty(\FormValidator::$errors)){
            if($obj = $this->find(array('where' => array('username' => $this->username, 'id' => array('!=' => $this->id)))))
                    FormValidator::addError("username", "Името е вече заето");
        }*/
        
        if(empty(\FormValidator::$errors)){
            if($obj = $this->plugin['aUser']->find(array('where' => array('email' => $this->email, 'relation_id' => array("!=" => $this->id)))))
                    FormValidator::addError("email", "E-mail адресът е вече зает");
        }
         
        if(empty(FormValidator::$errors) && $this->new_password != null)
            $this->password = Sign::crypty($this->username, $this->new_password);
        
        $this->real_name = \htmlentities($this->real_name, ENT_QUOTES | ENT_IGNORE, "UTF-8");
        
        if(!FormValidator::$errors){
            $ghelper = new GoogleHelper(API_KEY);
            $country = admin_Country::getCountry($this->country);
            $city = admin_City::getCity($this->city);

            $address = ($this->address1 . ' ' . $this->address2 . ' ' . $this->post_code . ' ' . $country .' '. $city);
            $coordinates = $ghelper->getCoordinates($address);
            $this->map_y = $coordinates['lat'];
            $this->map_x = $coordinates['long'];
        }
        
//        $this->info = htmlentities($this->info, ENT_QUOTES | ENT_IGNORE, "UTF-8");
        $this->info = \htmlentities($this->info, ENT_QUOTES, "UTF-8");
    }
    
    function beforeSave(){
        foreach(self::$addition_info as $column){
            if(isset($this->attributes[$column])){
                $attributes[$column] = $this->attributes[$column];
                unset($this->attributes[$column]);
            }
        }
        
        $attributes['relation_id'] = $this->id;
        $this->_correctUrls($attributes);
        if(!$_FILES)
            return $this->plugin['aUser']->save($attributes);
        
        if($_FILES){
            $error = array_shift($_FILES['admin_User']['error']);
            $this->plugin['aUser']->save($attributes);
            if($error != 4){
                $options = array('image' => array(
                        '0x0',
                        '225x225'
                    ));
                
                if(empty(FormValidator::$errors))
                    if($this->plugin['Attachments']->upload($this, $_FILES['admin_User'], $options, $this->pic)){
                        $attributes['pic'] = $this->plugin['Attachments']->id;
                        $src = $this->plugin['Attachments']->src;

                        return $this->plugin['aUser']->save($attributes);
                    }

                return false;
            }
        }
        
        return true;
    }
    
    private function _correctUrls(&$attributes){
        $link_addresses = array(
        'fb_page',
        'own_page',
        'tw_page',
        'gplus_page',
        'flickr_page',
        'linkedin_page',
        'youtube_page',
        );
        
        foreach($attributes as $key => $link_address){
            if($link_address != null && in_array($key, $link_addresses)){
                if((substr($link_address, 0, 7) != "http://") && substr($link_address, 0, 8) != "https://"){
                    $attributes[$key] = "http://".$link_address;
                }
            }
        }
        
        return $attributes;
    }
    
    protected function createValidate(){
        FormValidator::validate($this->real_name, 'real_name', array("textChars"=> '\,\.()0-9-\_\:\'\"'));
        if(empty(\FormValidator::$errors) && strlen($this->username) > 1){
            $obj_username = $this->find(array('where' => array('username' => $this->username)));
            
            if($obj_username){
                FormValidator::addError("username", "Името е заето");
            }
        }
        if($auser = $this->plugin['aUser']->find(array('where' => array('email' => $this->email)))){
            $this->plugin['aUser'] = $auser;
            FormValidator::addError("email", "Имейлът е регистриран");
        }
        $this->real_name = \htmlentities($this->real_name, ENT_QUOTES | ENT_IGNORE, "UTF-8");
        $this->ip = $_SERVER['REMOTE_ADDR'];
        $this->date = time();
        $this->cookie = genereteCode();
    }
}

?>
