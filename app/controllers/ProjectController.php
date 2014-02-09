<?
class ProjectController extends Controller {
     protected $before = array(
         'setProject' => array(
             'index'
         ),
         'useAjaxLayout' => array(
            'index'
        )
     );

     protected function setProject (){
         $this->project = new Project();
     }

     public function indexAction(){
         $this->title = 'list projects';
         $this->data = $this->project->findAll();

         foreach ($this->data as &$data){
             $data->attributes['small_content'] = mb_strcut($data->attributes['content'], 0, 150) . "...";
         }
     }
}