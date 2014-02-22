<?php

class SqlHandler {

    private $connection;
    private $database;
    private $writer;
    private static $showQuery = false;
    private static $showAllQueries = false;

    function __construct(array $options) {
        $this->connection = mysqli_connect($options['host'], $options['user'], $options['password'], $options['database']);
        if (!$this->connection) {
            throw new Exception('Not connected : ' . $this->connection->error);
        }

        //becouse of 'ш' and 'И'
//        mysql_query("SET NAMES 'UTF8'");
        $this->writer = new SqlWriter();
    }

    function query($query) {
        if(self::$showQuery === true){
            d($query);
            if(self::$showAllQueries != true)
                self::$showQuery = false;
        }

        if (!$result = $this->connection->query($query)) {
            throw new Exception('Invalid query: ' . mysql_error());
        }
        return $result;
    }

    function insert($table, $values) {
        $this->query($this->writer->insert($table, $values));

        return $this->connection->insert_id;
    }

    function update($table, $options, $where = null) {
        return $this->query($this->writer->update($table, $options, $where));
    }

    function delete($table, $where = null) {
        return $this->query($this->writer->delete($table, $where));
    }

    function select($table, $options = array()) {
        $result = $this->query($this->writer->select($table, $options));
        $array = array();
        while ($row = $result->fetch_assoc()) {
            $array[] = $row;
        }

        $result->free_result();

        return $array;
    }

    function row($table, $options = array()) {
        $result = $this->query($this->writer->select($table, $options));
        $row = $result->fetch_assoc();
        $result->free_result();

        return $row;
    }

    function exists($table, $where = null) {
        $this->query($this->writer->select($table, array(
            'where' => $where,
            'limit' => 1
        )));

        return $this->connection->num_rows > 0;
    }

    function count($table, $where = null, $field = '*', $distinct = false) {
        if ($field != '*') {
            $field = '`' . $this->connection->real_escape_string($field) . '`';

            if ($distinct) {
                $field = 'DISTINCT ' . $field;
            }
        }

        $row = $this->row($table, array(
            'fields' => "COUNT({$field}) AS the_count",
            'where' => $where
                ));

        return $row['the_count'];
    }

    function get($table, $id) {
        if (!$id = (int) $id) {
            return null;
        }

        return $this->row($table, array(
                    'where' => array('id' => $id),
                    'limit' => 1
                ));
    }

    public static function showQuery($onlyNext = true, $all = false) {
        if ($onlyNext)
            self::$showQuery = true;

        if ($all)
            self::$showAllQueries = true;
    }

}