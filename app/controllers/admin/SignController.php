<?

class admin_SignController extends admin_BaseController
{

    var $before = array(
        'setUser' => array('in', 'login')
    );

    protected function setUser ()
    {
        $this->sign = new Sign();
    }

    public function inAction ()
    {
        $this->data['isUserLogged'] = false;
        if (isset($this->adminUser) && ($this->adminUser instanceof ActiveRecord)) {
            $this->data['isUserLogged'] = true;
        }
    }

    public function loginAction ()
    {
        if (isset($this->adminUser) && ($this->adminUser instanceof ActiveRecord)) {
             $this->data['isUserLogged'] = true;
             return true;
        }

        $this->data['isUserLogged'] = false;

        if ($this->sign = $this->sign->loginValidate($_POST)) {
            $this->setUserCookie();
            $this->sign->setAfterLoginData();
            $this->data['isUserLogged'] = true;
            $this->sign->attributes['password'] = 'no way !';
            $this->data['currentUser'] = $this->sign;
        } else {
            $this->data['errors'] = Validator::$errors;
        }
    }

    public function outAction ()
    {
        //session_destroy();
        unset($_SESSION['isAdmin']);
        setcookie('user_cookie', '', time() - 1, '/');
        $this->returnUserToLoginPage();
    }

    protected function setUserCookie ()
    {
        $userData = serialize(array('user_id' => $this->sign->id));

        setcookie('user_cookie', $userData, time() + 86400, '/');
        $_SESSION['isAdmin'] = $this->sign->id;
    }

}