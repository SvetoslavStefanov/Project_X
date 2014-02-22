<?
class admin_Project extends ActiveRecord {
      static $table = "project";
      static $columns = array(
         'id'
         , 'title'
         , 'content'
     );

     public function createValidate ()
     {
         Validator::validate($this->title, "title", array('required' => 1, 'max_length' => 255));
         Validator::validate($this->content, "content", array('required' => 1, 'max_length' => 500));
     }
}