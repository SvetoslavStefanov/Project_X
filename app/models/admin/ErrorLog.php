<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ErrorLog
 *
 * @author Svetlio
 */
class admin_ErrorLog extends ActiveRecord{
    static $table = 'ErrorLog';
    static $columns = array(
      'msg',
        'time',
        'user',
        'ip',
        'where',
        'sys_msg'
    );
}

?>
