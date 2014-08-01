<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-7-26
 * Time: 14:40
 */

class admin_Language extends ActiveRecord{
    static $table = 'language';
    static $columns = array(
        'id',
        'name',
        'full_name',
        'is_default'
    );


} 