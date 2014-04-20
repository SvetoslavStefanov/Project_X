<?

class InfoPageController extends Controller
{
    var $before = array(
        'setNewPage' => array('index', 'new', 'create'),
        'getInfopagesInfo' => array('show', 'edit', 'update', 'destroy'),
    );

    protected function setNewPage(){
        $this->page = new InfoPage();
    }

    protected function getInfopagesInfo(){
        $this->page = InfoPage::get($this->id);
    }

    public function indexAction(){
        $this->data['pages'] = $this->page->findAll(array('sort' => 'id DESC'));
    }

    public function showAction(){
        $this->data['pageData'] = $this->page;
    }
}