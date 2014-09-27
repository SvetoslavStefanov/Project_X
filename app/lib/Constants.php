<?php
/**
 * Created by PhpStorm.
 * User: SveXteZ
 * Date: 14-9-27
 * Time: 17:36
 */

class Constants {
    private static $constants = [];

   public function __construct ($constants) {
       self::$constants = $constants;
   }

    public static function get($name) {
        return self::$constants[$name];
    }

    public static function getAll() {
        return self::$constants;
    }
} 