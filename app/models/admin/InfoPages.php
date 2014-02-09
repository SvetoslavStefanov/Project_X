<?
class admin_InfoPages extends ActiveRecord {
      static $table = 'infopages';
      static $columns = array(
         'created',
         'updated',
         'title',
         'content',
         'status', 
         'seo_description', 
         'seo_keywords'
         );
      
      protected function validate(){
           //$this->content = \htmlentities($this->content, null, "UTF-8");
      }
}