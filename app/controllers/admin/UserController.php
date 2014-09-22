<?php
/**
 * Description of UserController
 *
 * @author svetlio
 */
class admin_UserController extends admin_BaseController {

    var $before = array(
        'setUser' => array('index', 'create'),
        'getUser' => array('update', 'destroy', 'show', 'edit', 'changeLanguage', 'getPermissions', 'editPermissions', 'updatePermissions'),
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
        $this->user->originalPassword = $this->user->password;

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
        if ($this->user->attributes['last_login'] == 0) {
            $this->user->attributes['last_login_full'] = 'Never';
        } else {
            $this->user->attributes['last_login_full'] = date('d.m.Y H:i', $this->user->attributes['last_login']);
        }

    }

    public function editAction() {
        $this->user->attributes['password'] = '';
        $this->data['user'] = $this->user;
        $this->data['user']->attributes['info'] = htmlspecialchars_decode($this->data['user']->attributes['info'], ENT_QUOTES);
    }

    public function changeLanguageAction() {
        $this->user->selected_lang = $_POST['lang_id']; //TODO: secure this - make call to DB to check if there is any lang with this id
        $this->user->save();
        $this->data['result'] = true;
    }

    public function getPermissionsAction() {
        $constants = json_decode(file_get_contents((ROOT_DIR . '/constants.json')), true);
        $userPermissions = $this->user->getPermissions();
        $constantsPermissions = $constants['userPermissions'];

        foreach ($constantsPermissions as $cControllerName => $actions) {
            foreach ($actions as $cActionName => $value) {
                if (isset($userPermissions[$cControllerName]) && isset($userPermissions[$cControllerName][$cActionName])) {
                    $constantsPermissions[$cControllerName][$cActionName] = $userPermissions[$cControllerName][$cActionName];
                }
            }
        }

        $this->data['permissions'] = $constantsPermissions;
    }

    public function editPermissionsAction() {
        $this->getPermissionsAction();
    }

    public function updatePermissionsAction() {
        if ($this->user->setPermissions($_POST['permissions'])) {
            $this->user->save();
            $this->data['result'] = true;
            $this->user->attributes['password'] = 'no way !';
            $this->data['userId'] = $this->user->id;
        } else {
            $this->data['result'] = false;
            $this->data['errors'] = Validator::$errors;
        }
    }
}