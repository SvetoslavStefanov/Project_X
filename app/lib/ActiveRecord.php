<?php

abstract class ActiveRecord {

    static $db;
    static $table;
    static $columns;
    static $accessible = true;
    public $id;
    protected $validate;
    public $captcha;
    public $validation_form = true;

    public function __construct() {
        $this->id = 0;

        foreach (static::$columns as $column) {
            $this->$column = '';
        }
    }

    public function __isset($key) {
        return isset($this->$key);
    }

    public function __get($key) {
        if (!in_array($key, static::$columns)) {
            throw new Exception("Invalid column name - {$key} given for " . get_class($this));
        }

        return $this->$key;
    }

    public function __set($key, $value) {
//        if (!in_array($key, static::$columns)) {
//            throw new Exception("Invalid column name - {$key} given for " . get_class($this));
//        }

        return $this->$key = $value;
    }

    /**
     * Check if this row is new
     * @return type
     */
    public function isNew() {
        return $this->id === 0;
    }

    protected function validate() {

    }

    /**
     * Execute validations from form_validations table and default validation funcions in models
     * @return type
     */
    public function isValid() {
        if ($this->validate == null) {
            $this->validate();
        } else {
            $validate_func = $this->validate . 'Validate';
            $this->$validate_func();
        }

        return empty(Validator::$errors);
    }

    /**
     * Insert or update record
     * @param array $attributes
     * @param array $keys
     * @param string $validate
     * @return boolean
     */
    public function save($attributes = null, $keys = null, $validate = null) {
        $this->validate = $validate != null ? $validate : null;

        if (is_array($attributes)) {
            if ($keys === null) {
                $keys = static::$accessible === true ? static::$columns : static::$accessible;
            }

            foreach (Validator::filterArray($attributes, (array) $keys) as $key => $value) {
                $this->$key = $value;
            }
        }

        if (!$this->isValid()) {
            return false;
        }

        if ($this->beforeSave() === false) {
            return false;
        }

        if ($this->isNew()) {
            $this->id = self::$db->insert(static::$table, $this->getProperties());
        } else {
            self::$db->update(static::$table, $this->getProperties(), array('id' => $this->id));
        }

        $this->afterSave();

        return true;
    }

    /**
     * Execute this fuction before inserting / updating record in DB
     * Note: All validations are passed before calling this func
     */
    protected function beforeSave() {

    }

    /**
     * Execute this function after inserting / updating record in DB
     */
    protected function afterSave() {

    }

    /**
     * Execute this function before deleting record in DB
     */
    protected function beforeDestroy() {

    }

    /**
     * Delete record in DB
     * @return boolean
     */
    public function destroy() {
        if ($this->isNew()) {
            return false;
        }

        $this->beforeDestroy();

        self::$db->delete(static::$table, array('id' => $this->id));

        $this->id = 0;

        return true;
    }

    /**
     * Count rows
     * @param array $where
     * @return ActiveRecord object or null
     */
    public static function count($where) {
        return self::$db->count(static::$table, $where, 'id');
    }

    /**
     * Find if record exists in DB
     * @param array $where
     * @return ActiveRecord object or null
     */
    public static function exists($where) {
        return self::$db->exists(static::$table, $where);
    }

    /**
     * Get all fields for this ID
     * @param int $id
     * @return ActiveRecord object or null
     * @throws NotFoundException
     */
    public static function get($id) {
        if (!$id = (int) $id) {
            throw new NotFoundException('Invalid id for ' . get_called_class() . '.');
        }

        if (!$record = self::find(array('where' => array('id' => $id)))) {
            throw new NotFoundException(get_called_class() . " with '{$id}' can't be found.");
        }

        return $record;
    }

    /**
     * Find by id
     * @param int $id
     * @return ActiveRecord object or null
     */
    public static function findById($id) {
        return self::find(array('where' => array('id' => $id)));
    }

    /**
     * Find record by given criteria
     * @param type $options
     * @return ActiveRecord object or null
     */
    public static function find($options = array()) {
        $options = (array) $options;
        $options['limit'] = 1;

        if (!$row = self::$db->row(static::$table, $options)) {
            return null;
        }

        return self::buildFromRow($row);
    }

    /**
     * Find all records for given criteria
     * @param type $options
     * @return ActiveRecord object or null
     */
    public static function findAll($options = array()) {
        $records = array();
        foreach (self::$db->select(static::$table, $options) as $row) {
            $records[] = self::buildFromRow($row);
        }
        return $records;
    }


    /**
     * Delete all records by given criteria
     * @param array $options
     * @return void
     */
    public static function destroyAll($options = array()) {
        foreach (self::findAll($options) as $record) {
            $record->destroy();
        }
    }

    /**
     * Create a Model object with data $row
     * @param array $row
     * @return ActiveRecord object
     */
    protected static function buildFromRow($row) {
        $class = get_called_class();
        $record = new $class();
        $record->id = array_cut($row, 'id');

        foreach ($row as $key => $val) {
            $record->$key = $val;
        }

        return $record;
    }

    protected function getProperties() {
        $properties = [];

        foreach (static::$columns as $column) {
            $properties[$column] = $this->$column;
        }

        $properties['id'] = $this->id;

        return $properties;
    }

}

