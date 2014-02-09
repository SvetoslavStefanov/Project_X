<?
class NewsController extends Controller{
    var $before = array(
        'setNewNews' => array('new', 'index', 'update', 'create'),
        'getNewsInfo' => array('update', 'destroy', 'show', 'edit'),
        'confirmLogged' => array('new', 'edit', 'destroy', 'create')
    );

    protected function setNewNews(){
        $this->news = new News();
    }


    public function getNewsInfo(){
        $news = new News();
        $this->news = $news->get($this->id);
    }
    
    public function newAction(){
        $this->title = 'Създаване на новина';
    }
    
    public function createAction(){
        $_POST['News']['from'] = $this->currentUser->username;
        if ($this->news->save($this->post('News'))){
                $this->redirect("News/show/{$this->news->id}");
        } else {
                $this->action('new');
        }
    }
    
    public function indexAction(){
        $this->loadPlugin(array('Attachments' => array('testttt', ' mega test !')));
        $this->loadPlugin('Testy');
        
        $this->title = 'Всички новини';
        $this->news = $this->news->findAll();
    }
    
    public function showAction(){
        $this->title = $this->news->title;
    }

    public function editAction(){
        $this->title = $this->news->title.' РЕДАКТИРАНЕ';
    }

    public function updateAction(){
        if($this->news->save($this->post('News'))){
            $this->redirect("News/show/{$this->news->id}");
        }else{
            $this->action('edit');
        }
    }


    public function DestroyAction(){
        $this->news->destroy();
        $this->redirect("News/index");
    }
}