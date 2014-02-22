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
     public function search($searchString) {

       $result = parent::$db->query("SELECT * FROM project WHERE title LIKE '%$searchString%'");
       $records = array();
        while ($row = mysql_fetch_assoc($result)) {
            $records[] = parent::buildFromRow($row);
        }
        return $records;
      }
}