<?
class admin_InfopagesController extends admin_BaseController{
    var $before = array(
        'setNewPage' => array('index', 'new', 'create'),
        'getInfopagesInfo' => array('show', 'edit', 'update', 'destroy'),
        'setCKeditor'      => array('edit', 'new')
    );
    
    protected function setNewPage(){
        $this->page = new admin_InfoPages();
    }

    protected function getInfopagesInfo(){
        $this->page = new admin_InfoPages();
        $this->page = $this->page->get($this->id);
    }

    protected function setCKeditor(){
        include_once "ckeditor/ckeditor.php";
        include_once 'ckfinder/ckfinder.php';
        // Create a class instance.
        $CKEditor = new CKEditor();
        // Path to the CKEditor directory.
        $CKEditor->basePath = '/ckeditor/';
        CKFinder::SetupCKEditor($CKEditor, '/ckfinder/');
        //set config options to ckeditor
        $CKEditor->config['width'] = 920;
        $CKEditor->config['height'] = 520;
        $CKEditor->config['id'] = 'admin_InfoPages_content';
        $CKEditor->textareaAttributes = array("cols" => 8, "rows" => 10);
        $CKEditor->returnOutput = true;
        // Create a textarea element and attach CKEditor to it.
        $this->code = ($CKEditor->editor("admin_InfoPages[content]", $this->page->content));
    }
    
    public function indexAction(){
        $this->title = 'Инфо страници';
        $this->pages = $this->page->findAll();
    }
    
    public function newAction(){
        $this->title = 'Добавяне на инфо страница';
    }
    
    public function createAction(){
        $_POST['admin_InfoPages']['created'] = time();
        if($this->page->save($this->post('admin_InfoPages'))){
            $this->redirect('InfoPages/index');
        }else{
            $this->action('new');
        }
    }
    
    public function showAction(){
        $this->title = $this->page->title;
        //$this->page->content = \html_entity_decode($this->page->content);
    }
    
    public function editAction(){
        $this->title = $this->page->title .' '. ' Редактиране';
        //$this->page->content = \html_entity_decode($this->page->content);
    }
    
    public function updateAction(){
        if($this->page->save($this->post('admin_InfoPages'))){
            $this->redirect("InfoPages/show/{$this->id}");
        }else{
            $this->page->content = \html_entity_decode($this->page->content);
            $this->action('edit');
        }
    }
    
    public function destroyAction(){
        $this->page->destroy();
        $this->redirect('InfoPages/index');
    }
}