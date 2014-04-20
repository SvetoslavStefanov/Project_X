<?
class admin_InfopageController extends admin_BaseController
{
    var $before = array(
        'setNewPage' => array('index', 'new', 'create'),
        'getInfopagesInfo' => array('show', 'edit', 'update', 'destroy'),
    );

    protected function setNewPage(){
        $this->page = new admin_InfoPage();
    }

    protected function getInfopagesInfo(){
        $this->page = admin_InfoPage::get($this->id);
    }

    public function indexAction(){
        $this->data['pages'] = $this->page->findAll(array('sort' => 'id DESC'));
    }

    public function createAction(){
        if($this->page->save($_POST['attributes'])){
            $this->data['result'] = true;
        }else{
            $this->data['result'] = false;
        }
    }

    public function showAction(){
        $this->data['pageData'] = $this->page;
    }

    public function editAction(){
        $this->data['pageData'] = $this->page;
    }

    public function updateAction(){
        if($this->page->save($_POST['attributes'])){
            $this->data['result'] = true;
        }else{
            $this->data['result'] = false;
        }
    }

    public function destroyAction(){
        $this->page->destroy();
        $this->data['result'] = true;
    }
}