<?
class News extends ActiveRecord{
    static $table = 'news';
    static $columns = array('title','content', 'from');
    
    
    protected function validate(){
        $this->content = trim($this->content);
        if(empty($this->title)){
            $this->addError('title', 'Непопълнено заглавие');
        }
        if(empty($this->content)){
            $this->addError('title', 'Непопълнен текст');
        }
    }
}