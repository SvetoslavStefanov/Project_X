<?
class Project extends ActiveRecord {
      static $table = "project";
      static $columns = array(
         'id'
         , 'title'
         , 'content'
     );

      public function search($searchString) {

      	$result = parent::$db->query("SELECT * FROM project WHERE title LIKE '%$searchString%'");
      	$records = array();
        while ($row = mysql_fetch_assoc($result)) {
            $records[] = parent::buildFromRow($row);
        }
        return $records;
      }
}