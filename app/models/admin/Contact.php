<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-4-21
 * Time: 18:30
 */

class admin_Contact extends ActiveRecord
{
    static $table = 'contact';
    static $columns = array(
        'ip',
        'subject',
        'content',
        'email',
        'created'
    );
}