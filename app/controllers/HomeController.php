<?
class HomeController extends Controller{
    protected $before = array(
        
    );

    public function homeAction(){
        $this->title = "Home";
        $this->projects = Project::findAll();
    }
}