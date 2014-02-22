<?

class Article extends ActiveRecord
{

    static $table = 'article';
    static $columns = array('title', 'content', 'from');

    protected function validate ()
    {
        $this->content = trim(strip_tags($this->content));

        //Validator::validate($this->title, 'title', array('required' => 1, 'testChars' => ' '));
        //Validator::validate($this->content, 'content', array('required' => 1, 'testChars' => ' -.’,'));
    }

}