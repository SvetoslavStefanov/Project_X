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
         FormValidator::validate($this->title, "title", array('required' => 1, 'max_length' => 255));
         FormValidator::validate($this->content, "content", array('required' => 1, 'max_length' => 500));
     }
}