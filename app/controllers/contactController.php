<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-4-21
 * Time: 18:30
 */

class ContactController extends Controller
{
    var $before = array(
        'setNewContact' => array('create')
    );

    protected function setNewContact() {
        $this->contact = new Contact();
    }

    public function createAction() {
        $this->data['result'] = false;

        if($this->contact->save($_POST['attributes'], null, 'create')){
            $this->data['result'] = true;
            $this->data['contact'] = $this->contact;
        }else{
            $this->data['errors'] = FormValidator::$errors;
        }
    }
} 