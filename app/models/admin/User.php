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
//        'cookie',
        'email',
        'real_name',
        'last_login',
        'info',
        'selected_lang',
        'permissions',
        'pic'
    );

    public $originalPassword = null;

    protected function validate() {
        Validator::validate($this->password, "password", ['required' => false, 'min_length' => 6]);
        Validator::validate($this->info, "info", array("textChars" => "\'\",0-9.\-()!?<>"));
        Validator::validate($this->real_name, 'real_name', array("textChars" => '\,\.()0-9-\_\:\'\"'));
        /*if(empty(\Validator::$errors)){
            if($obj = $this->find(array('where' => array('username' => $this->username, 'id' => array('!=' => $this->id)))))
                    Validator::addError("username", "Името е вече заето");
        }*/

//        if(empty(\Validator::$errors)){
//            if($obj = $this->plugin['aUser']->find(array('where' => array('email' => $this->email, 'relation_id' => array("!=" => $this->id)))))
//                    Validator::addError("email", "E-mail адресът е вече зает");
//        }

        if (empty(Validator::$errors) && strlen($this->password) > 0 && strlen($this->originalPassword) > 0) {
            $this->password = Sign::crypty($this->username, $this->password);
        }
//
        if (empty(Validator::$errors) && (strlen($this->password) == 0)) {
            $this->password = $this->originalPassword;
        }

        $this->real_name = htmlentities($this->real_name, ENT_QUOTES | ENT_IGNORE, "UTF-8");
        $this->info = htmlentities($this->info, ENT_QUOTES | ENT_IGNORE, "UTF-8");
    }

    protected function createValidate() {
        Validator::validate($this->username, "username", ['required' => true, 'min_length' => 6]);
        Validator::validate($this->email, "email", ['required' => true, 'min_length' => 8, "isMail" => true]);
        Validator::validate($this->permissions, "permissions", ['required' => true]);
        Validator::validate($this->password, "password", ['required' => false, 'min_length' => 6]);
        Validator::validate($this->info, "info", array("textChars" => "\'\",0-9.\-()!?<>"));
        Validator::validate($this->real_name, 'real_name', array("required" => true, "textChars" => '\,\.()0-9-\_\:\'\"'));

        $this->setPermissions($this->permissions);

        if (empty(\Validator::$errors) && strlen($this->username) > 1) {
            $obj_username = $this->find(array('where' => array('username' => $this->username)));

            if ($obj_username) {
                Validator::addError("username", "Името е заето");
            }
        }

        if ($this->find(array('where' => array('email' => $this->email)))) {
            Validator::addError("email", "Имейлът е регистриран");
        }

        if (empty(Validator::$errors) && $this->password != null) {
            $this->password = Sign::crypty($this->username, $this->password);
        }

        $this->last_login = 0;
        $this->real_name = \htmlentities($this->real_name, ENT_QUOTES | ENT_IGNORE, "UTF-8");
    }

    public function setPermissions($newPermissions) {
        $this->permissions = json_encode($newPermissions);

        return true;
    }

    public function getPermissions() {
        return json_decode($this->permissions, true);
    }

    public function getUserImage() {
        $attachments = new Attachments('user');
        $attachments->setTable($this);

        if ($this->pic === 0) {
            $userPic = Constants::get('defaultUserPic');
        } else {
            $userPic = $attachments->getAttachment($this->pic);
        }

        if ($userPic === false) {
            $userPic = Constants::get('defaultUserPic');
        }

        return $userPic;
    }

    public function getGalleryImages() {
        $attachments = new Attachments('user');
        $attachments->setTable($this);

        $imagesObject = $attachments->findAll(array('where' => array('relation_id' => $this->id)));
        $images = [];

        foreach ($imagesObject as $key => $image) {
            if ($image->id === $this->pic) {
                unset($images[$key]);
                continue;
            }

            array_push($images, 'attachments/' . $image->attributes['src']);
        }

        return $images;
    }
}