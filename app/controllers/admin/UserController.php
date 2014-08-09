<?php
/**
 * Description of UserController
 *
 * @author svetlio
 */
class admin_UserController extends admin_BaseController {

    var $before = array(
        'setUser' => array('index', 'create'),
        'getUser' => array('update', 'destroy', 'show', 'edit'),
    );

    protected function setUser() {
        $this->user = new admin_User();
    }

    protected function getUser() {
        $this->user = admin_User::get($this->id);
    }

    public function indexAction() {
        $this->data['users'] = $this->user->findAll(array('sort' => 'username DESC'));
    }

    public function updateAction() {
        unset($_POST['password']);
        if ($this->user->save($_POST)) {
            $this->data['result'] = true;
            $this->user->attributes['password'] = 'no way !';
            $this->data['userId'] = $this->user->id;
        } else {
            $this->data['result'] = false;
            $this->data['errors'] = Validator::$errors;
        }
    }

    public function destroyAction() {
        $this->user->destroy();
    }

    public function createAction() {
        if ($this->user->save($_POST, null, 'create')) {
            $this->data['result'] = true;
            $this->user->attributes['password'] = 'no way !';
            $this->data['userId'] = $this->user->id;
        } else {
            $this->data['result'] = false;
            $this->data['errors'] = Validator::$errors;
        }
    }

    public function showAction() {
        $this->user->attributes['password'] = '';
        $this->data['user'] = $this->user;
    }

    public function editAction() {
        $this->user->attributes['password'] = '';
        $this->data['user'] = $this->user;
    }
}