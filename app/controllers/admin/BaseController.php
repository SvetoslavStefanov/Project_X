<?php
/**
 * Description of BaseController
 *
 * @author svetlio
 */
class admin_BaseController extends Controller {
    protected $adminUser;

    public function __construct () {
        $this->permissionsPlugin = new Permissions();
    }

    protected function before () {
        $this->controllerName = str_replace('_', '/', $this->controllerName);
        $this->levelAccess();
        $this->confimAdminLogged();
        Dispatcher::$in_admin = true;
    }

    protected function levelAccess () {
        if (isset ($_SESSION['isAdmin'])) {
            $this->adminUser = admin_User::get($_SESSION['isAdmin']);
            return true;
        } else {
            return false;
        }
    }

    protected function confimAdminLogged () {
        if (empty($this->adminUser) && $this->controllerName != 'admin/Sign' && $this->actionName != 'in') {
            $this->returnUserToLoginPage();
        }
    }

    public function action ($actionName, $id = null) {
        $this->permissionsPlugin->setController(str_replace('admin_', '', get_class($this)));
        $this->permissionsPlugin->setUserPermissions($this->adminUser->getPermissions());

        if ($this->permissionsPlugin->checkPermissionsByAction($actionName)) {
            $this->{$actionName . 'Action'}($id);

            if (is_array($this->data) && isset($this->data['isUserLogged']) && !$this->data['isUserLogged']) {
                $this->setHeaderError(401);
            }

            if (!$this->rendered) {
                $this->render($actionName);
            }
        } else {
            $this->setHeaderError(550);
            $this->render($actionName);
        }
    }
}