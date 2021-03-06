<?
class admin_ProjectController extends admin_BaseController{
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
        $this->data['projects'] = $this->project->findAll(array('sort' => 'id DESC'));

        foreach ($this->data['projects'] as &$data){
             $data->small_content = mb_strcut($data->content, 0, 150) . "...";
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

    public function showAction() {
        $this->data = $this->project;
    }

    public function destroyAction(){
        $this->data['result'] = false;
        $this->project = admin_Project::get($_POST['id']);

        if($this->project->destroy()){
            $this->data['result'] = true;
        }
    }
}
