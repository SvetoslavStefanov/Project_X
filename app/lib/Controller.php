<?php

class Controller extends Plugin
{

    public $controllerName;
    public $actionName;
    public $id;
    public $model;
    public $rendered = false;
    protected $layout = 'layoutAjax';
    protected $before;
    public static $default_pic;
    public $message = null;
    protected $data = array();
    protected $predefinedActions = [
        'goToPreviousPage' => 'Redirect user to previous page',
        'goToSignInPage' => 'Redirect user to Sign in page'
    ];

    public function dispatch ($controllerName, $actionName, $id)
    {
        $this->controllerName = $controllerName;
        $this->actionName = $actionName;
        $this->id = $id;

        $this->before();

        foreach ((array) $this->before as $method => $names) {
            if ((is_array($names) && in_array($actionName, $names)) || $actionName == $names) {
                $this->{$method}();
            }
        }

        $this->action($actionName, $id);
    }

    public function action ($actionName, $id = null)
    {
        $this->{$actionName . 'Action'}($id);

        if (!$this->rendered) {
            $this->render($actionName);
        }
    }

    protected function render ($template, $layout = true)
    {
        $view = new View();
        $view->assign(get_object_vars($this));

        $view->render(
                $template = $this->controllerName . '/' . $template, $layout === true ? $this->layout : $layout
        );

        $this->rendered = true;
    }

    /* protected function get($key, $default = null){
      return isset($_GET[$key]) ? $_GET[$key] : $default;
      } */

    protected function get ($key, $default = null, $stripslashes = true)
    {
        if ($stripslashes && isset($_GET[$key]) && \is_array($_GET[$key])) {
            //array_map("stripslashes", $_POST[$key]);
            foreach ($_GET[$key] as $keyy => $value) {
                $_POST[$key][$keyy] = \stripslashes($value);
            }
        }

        return isset($_GET[$key]) ? $_GET[$key] : $default;
    }

    protected function post ($key, $default = null, $stripslashes = true)
    {
        if ($stripslashes && isset($_POST[$key]) && \is_array($_POST[$key])) {
            //array_map("stripslashes", $_POST[$key]);
            foreach ($_POST[$key] as $keyy => $value) {
                $_POST[$key][$keyy] = \stripslashes($value);
            }
        }

        return isset($_POST[$key]) ? $_POST[$key] : $default;
    }

    protected function back ()
    {
        $this->data['predefinedAction'] = $this->predefinedActions['goToPreviousPage'];
    }

    protected function before ()
    {
        if (isset($_COOKIE['user_cookie']) && $_COOKIE['user_cookie'] != 'out') {
            $cookie = unserialize(stripslashes($_COOKIE['user_cookie']));
            $this->currentUser = Sign::find(array('where' => array('id' => $cookie['user_id']))); //Sign::get($cookie['userId']);
        }
    }

    protected function returnUserToLoginPage () {
        $this->data['isUserLogged'] = false;
        $this->data['errors'] = 'This area is only for registered users !';
        $this->data['predefinedAction'] = $this->predefinedActions['goToSignInPage'];
    }

    public function confirmLogged ()
    {
        if (empty($this->currentUser)) {
            $this->returnUserToLoginPage();
            exit;
        }
    }

    protected function privatePage ()
    {
        if ($this->currentUser->id != $this->id) {
            $this->data['errors'] = 'This page is private !';
            $this->back();
            exit;
        }
    }

}