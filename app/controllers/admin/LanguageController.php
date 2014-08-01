<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-7-26
 * Time: 14:35
 */

class admin_LanguageController extends admin_BaseController
{
    protected $before = array(
        'setLanguage' => array(
            'index', 'create'
        ),
        'getLanguage' => array(
            'destroy'
        )
    );

    protected function setLanguage()
    {
        $this->language = new admin_Language();
    }

    protected function getLanguage()
    {
        $this->language = admin_Language::get($this->id);
    }

    public function indexAction()
    {
        $this->data['languages'] = $this->language->findAll(array('sort' => 'id DESC'));
    }

    public function createAction()
    {
        $this->data['result'] = false;

        if ($this->language->save($_POST)) {
            $this->data['result'] = true;
            $this->data['language'] = $this->language;
        } else {
            $this->data['errors'] = FormValidator::$errors;
        }
    }

    public function destroyAction(){
        $this->data['result'] = false;

        if($this->language->destroy()){
            $this->data['result'] = true;
        }
    }
}