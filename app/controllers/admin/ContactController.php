<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-4-21
 * Time: 20:11
 */

class admin_ContactController extends admin_BaseController{
    var $before = array(
        'setNewContact' => array('index'),
        'getNewContact' => array('destroy')
    );

    protected function setNewContact() {
        $this->contact = new admin_Contact();
    }

    protected function getNewContact() {
        $this->contact = admin_Contact::get($this->id);
    }

    public function indexAction() {
        $this->data['records'] = $this->contact->findAll(array('sort' => 'id DESC'));
    }

    public  function destroyAction() {
        $this->contact->destroy();
        $this->data['result'] = true;
    }
} 