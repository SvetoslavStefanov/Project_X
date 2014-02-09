<?
class admin_ProjectController extends admin_BaseController{
    protected $before = array(
        'setProject' => array(
            'create', 'index'
        ),
        'getProject' => array(
            'edit', 'update', 'destroy'
        ),
        'useAjaxLayout' => array(
            'index', 'login', 'edit', 'update', 'create', 'destroy'
        )
    );

    protected function setProject(){
        $this->project = new admin_Project();
    }

    protected function getProject(){
        $this->project = admin_Project::get($this->id);
    }

    public function createAction(){
        $this->data['result'] = false;

        if($this->project->save($_POST, null, 'create')){
            $this->data['result'] = true;
            $this->data['project'] = $this->project;
        }else{
            $this->data['errors'] = FormValidator::$errors;
        }
    }

    public function indexAction(){
        $this->title = 'List projects';
        $this->data['projects'] = $this->project->findAll();

        foreach ($this->data['projects'] as &$data){
             $data->attributes['small_content'] = mb_strcut($data->attributes['content'], 0, 150) . "...";
         }

    }

    public function editAction(){
        $this->data['project'] = $this->project;
    }

    public function updateAction(){
        $this->data['result'] = false;

        if($this->project->save($_POST, null, 'create')){
            $this->data['result'] = true;
        }else{
            $this->data['errors'] = FormValidator::$errors;
        }
    }

    public function destroyAction(){
        $this->data['result'] = false;

        if($this->project->destroy()){
            $this->data['result'] = true;
        }
    }
}