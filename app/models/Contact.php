<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-4-21
 * Time: 18:30
 */

class Contact extends ActiveRecord
{
    static $table = 'contact';
    static $columns = array(
        'ip',
        'subject',
        'content',
        'email',
        'created'
    );

    protected function createValidate () {
        Validator::validate($this->subject, "subject", array('required' => 1, 'max_length' => 255));
        Validator::validate($this->content, "content", array('required' => 1, 'max_length' => 1000));
        Validator::validate($this->email, "email", array('required' => 1, 'max_length' => 100));

        $this->created = time();
        $this->ip = $_SERVER['REMOTE_ADDR'];
    }
} 