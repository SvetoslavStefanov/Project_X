<?
class Attachments extends Plugin{
    public $test = 'TEST';


    public function __construct($arg = array()){
    }
    
    public function test($arg){
       echo  'plugin attachment loaded';
    }
    
}