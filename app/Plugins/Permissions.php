<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-9-6
 * Time: 13:31
 */

class Permissions {
    private $userPermissions = null;
    private $permissions = [];
    private $controllerName = null;

    public function __construct() {
        $constants = json_decode(file_get_contents((ROOT_DIR . '/constants.json')), true);

        $this->permissions = $constants['userPermissions'];
    }

    public function isBooleanProperty ($data) {
            if (is_bool($data)) {
                return $data;
            }

            return $data == 'true' ? true : false;
        }

    public function setController($controllerName) {
        $this->controllerName = $controllerName;
    }

    public function setUserPermissions($permissions) {
        $this->userPermissions = $permissions;
    }

    public function checkPermissionsByAction($actionName) {
        if (!isset($this->permissions[$this->controllerName][$actionName])) {
            return false;
        }

        if (!isset($this->userPermissions[$this->controllerName][$actionName])) {
            return $this->isBooleanProperty($this->permissions[$this->controllerName][$actionName]);
        }

        return $this->isBooleanProperty($this->userPermissions[$this->controllerName][$actionName]);
    }
}