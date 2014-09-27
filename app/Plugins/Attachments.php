<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Attachments
 *
 * @author svetlio
 */
class Attachments extends ActiveRecord{
    public $default_dir;
    private $baseDir = 'attachments';
    public $dir;
    public $object;
    static $table;
    static $columns = array(
        'relation_id',
        'src',
        'type',
        'thumb'
    );

    public function __construct($default_dir = 'user_files'){
        $this->default_dir = $default_dir;
        $this->generateDir();
        parent::__construct();
    }

    public function setTable (ActiveRecord $object){
        $this->object = $object;
        $class = get_class($object);
        self::$table = $class::$table . "_attachments";
    }

    public function generateDir(){
        $time = getdate();
        $this->dir = $this->default_dir . '/' . $time['mon'].$time['year'];

        if(!is_dir($this->baseDir . '/' . $this->dir)){
            mkdir($this->baseDir . '/' . $this->dir, 0777, true);
        }
    }

    protected function upload($file, $options = null,  $id = 0){
        if(!is_array($file)){
            return false;
        }

        $this->generateDir();
        $file = array_shift($file);

        if(!$src = Upload::file($file, $this->baseDir . '/' . $this->dir, $options)){
            Validator::addError("Възникна грешка при качването на файла");
            return false;
        }

        if($id != 0){
            $this->delete($id);
        }

        $needThumb = 0;
        if ($options !== null && is_array($options) && isset($options['image'])) {
            foreach ($options['image'] as $key => $val) {
                if ($val !== '0x0') {
                    $needThumb = 1;
                    break;
                }
            }
        }

        return $this->saveFromForm($src, $needThumb);
    }

    public function uploadImage($file, $imageOptions, $id = 0) {
        $types = ['image' => $imageOptions];

        return $this->upload($file, $types, $id);
    }

    public function saveFromForm($src, $thumb = 0){
        if(!$this->save(array(
            'relation_id'   => $this->object->id,
            'src'           => $this->dir . "/" . $src,
            'type'          => \Upload::type($src),
            'thumb'         => $thumb
        ))){
            return false;
        }
        return $this->id;
    }

    public function delete($id){
        if(!$obj = $this->findById($id)){
            return false;
        }
        if(basename($obj->src) != basename(\Controller::$default_pic)){
            if($obj->thumb == 1){
                if(\file_exists($this->dir . "/thumb_".basename($obj->src))){
                    unlink($this->dir . "/thumb_".basename($obj->src));
                }
            }
            if(\file_exists($obj->src)){
                unlink($obj->src);
            }
        }

        return $obj->destroy();

    }

    public function getAttachment($id, $thumb = false){
        if(!$obj = $this->findById($id)){
            return false;
        }

        $src = explode("/", $obj->src);
        $file = array_pop($src);

        //$date_dir = array_pop($src);
        //$main_dir = "/" . $this->dir . "/";
        $main_dir = "/" . join("/", $src) . "/";

        return ATTACHMENTS_DIR . ($thumb ? $main_dir . "thumb_" . $file : $main_dir . $file);
    }
}