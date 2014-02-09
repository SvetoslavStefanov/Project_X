<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Orders
 *
 * @author svetlio
 */
class Orders extends ActiveRecord {
    static $table = 'das';
    static $columns = array(
        'order'
    );
    
    public function updateCountryOrder($country_id){
        self::$columns = array('order', 'country_id');
        self::$table = 'country_order';

        if(!$obj = $this->find(array('fields' => 'id, `order`', 'where' => array('country_id' => $country_id)))){
            $this->save(array('country_id' => $country_id, 'order' => 0));
            $obj = $this;
            $obj->order = $this->count(array('order' => array('>' => 0))) + 1;
        }
        $all_countries = $this->findAll(array('where' => array('order' => array('<' => $obj->order))));
        
        foreach($all_countries as $country){
            $country->save(array('order' => $country->order + 1));
        }
        $obj->save(array('order' => 1));
    }
    
    public function getCountries(){
        self::$columns = array('order', 'country_id');
        self::$table = 'country_order';
        
        return $this->findAll(array('sort' => '`order` ASC'));
    }
    
    public function getCities($country_id){
        self::$columns = array('order', 'city_id', 'country_id');
        self::$table = 'city_order';
        
        return $this->findAll(array('where' => array('country_id' => $country_id), 'sort' => '`order` ASC'));
    }
    
    public function updateCityOrder($city_id, $country_id){
        self::$columns = array('order', 'city_id', 'country_id');
        self::$table = 'city_order';
        
        if(!$obj = $this->find(array('fields' => 'id, `order`', 'where' => array('city_id' => $city_id)))){
            $this->save(array('city_id' => $city_id, 'country_id' => $country_id, 'order' => 0));
            $obj = $this;
            $obj->order = $this->count(array('order' => array('>' => 0))) + 1;
        }
        
        $all_cities = $this->findAll(array('where' => array('order' => array('<' => $obj->order))));
        
        foreach($all_cities as $city){
            $city->save(array('order' => $city->order + 1));
        }
        
        return $obj->save(array('order' => 1));
    }
    
    public function getusers(){
        self::$columns = array('order', 'user_id');
        self::$table = 'user_order';
        
        return $this->findAll(array('sort' => '`order` ASC'));
    }
    
    public function updateUserOrder($user_id){
        self::$columns = array('order', 'user_id');
        self::$table = 'user_order';
        
        if(!$obj = $this->find(array('fields' => 'id, `order`', 'where' => array('user_id' => $user_id)))){
            $this->save(array('user_id' => $user_id, 'order' => 0));
            $obj = $this;
            $obj->order = $this->count(array('order' => array('>' => 0))) + 1;
        }
        $all_users = $this->findAll(array('where' => array('order' => array('<' => $obj->order))));
        
        foreach($all_users as $user){
            $user->save(array('order' => $user->order + 1));
        }
        $obj->save(array('order' => 1));
    }
}

?>
