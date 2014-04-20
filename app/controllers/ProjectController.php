<?
class ProjectController extends Controller{
    protected $before = array(
        'setProject' => array(
            'create', 'index', 'search'
        ),
        'getProject' => array(
            'edit', 'update','show'
        )
    );

    protected function setProject(){
        $this->project = new admin_Project();
    }

    protected function getProject(){
        $this->project = admin_Project::get($this->id);
    }

    public function indexAction(){
        $this->title = 'List projects';
        $this->data['projects'] = $this->project->findAll(array('sort' => 'id DESC'));

        foreach ($this->data['projects'] as &$data){
             $data->attributes['small_content'] = mb_strcut($data->attributes['content'], 0, 150) . "...";
         }

    }

    public function showAction() {
        $this->data = $this->project;
    }
}
