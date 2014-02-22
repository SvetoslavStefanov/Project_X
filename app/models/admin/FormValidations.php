<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validations
 *
 * @author svetlio
 */
class admin_FormValidations extends \ActiveRecord{
    public static $table = 'form_validations';
    static $columns = array(
        'address1',
        'address2',
        'name'
    );

    protected function validate()
    {
        Validator::validate($this->name, "name", array('required' => true, 'testChars' => ' '));
        Validator::validate($this->address1, "address1", array('required' => true));
        Validator::validate($this->address2, "address2", array('required' => true));
    }
}

?>
