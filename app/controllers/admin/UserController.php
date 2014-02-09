<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserController
 *
 * @author svetlio
 */
class admin_UserController extends admin_BaseController {

    var $before = array(
        'setUser' => array('index', 'update', 'new', 'create'),
        'getUser' => array('edit', 'update', 'destroy', 'destroyPic', 'show'),
        'setPlugin' => array('edit', 'update', 'destroyPic', 'destroy', 'show'),
        'getContries' => array('edit', 'update', 'new', 'create'),
        'getCities' => array('edit', 'update', 'new', 'create'),
        'getUserSubscribes' => array('edit', 'update', 'show'),
        'getaUser' => array('edit', 'update', 'destroy', 'destroyPic', 'show'),
        'setaUser' => array('index', 'edit', 'new', 'create')
    );

    protected function setUser() {
        $this->user = new admin_User();
    }

    protected function getUser() {
        //$this->user_get = admin_User::get($this->id);
        $this->user_get = admin_User::find(array(
                    'fields' => 'username, active, real_name, id, level, password',
                    'where' => array('id' => $this->id)));
    }

    protected function setaUser() {
        $this->auser = new aUser();
        $this->user->plugin['aUser'] = $this->auser;
        $this->user_get->plugin['aUser'] = $this->auser;
    }

    protected function getaUser() {
        if (!$this->auser = aUser::find(array('where' => array('relation_id' => $this->id))))
            $this->auser = new aUser();

        $this->user_get->plugin['aUser'] = $this->auser;
    }

    protected function setPlugin() {
        $this->user_get->plugin['Attachments'] = new \Attachments();
        $this->user_get->plugin['Attachments']->setTable($this->user_get);
    }

    protected function getContries() {
        $contries = \admin_Country::findAll(array('fields' => 'id, name'));
        $forms = array();
        $i = 1;
        $forms[0]['value'] = 0;
        $forms[0]['content'] = 'Изберете държава';
        foreach ($contries as $form) {
            $forms[$i]['value'] = $form->id;
            $forms[$i]['content'] = $form->name;
            $i++;
        }

        $this->contries = $forms;
    }

    protected function getCities() {
        $cities = \admin_City::findAll(array('fields' => 'id, name, country_id'));
        $forms = array();

        foreach ($cities as $form) {
            $forms[$form->country_id][] = array("value" => $form->id, "content" => $form->name);
        }

        $this->cities = $forms;
    }

    protected function getUserSubscribes() {
        $this->sub = new Subscribe();
        $this->subs_countries = $this->sub->findAll(array('where' => array('user_id' => $this->id, 'about' => 'country'), 'sort' => 'about DESC'));
        $this->subs_cities = $this->sub->findAll(array('where' => array('user_id' => $this->id, 'about' => 'city'), 'sort' => 'about DESC'));
        if ($this->subs_cities) {
            foreach ($this->subs_cities as $city) {
                $this->cities_test[$city->relation_id] = City::find(array(
                            'fields' => 'id, country_id',
                            'where' => array('id' => $city->relation_id)));
            }
        }
    }

    /*
      public function indexAction() {
      $this->title = 'Покажи всички потребители';
      $where1 = array("sort" => 'id DESC');
      $where2 = array("sort" => 'id DESC');
      if (isset($this->id) && strlen($this->id) > 2) {
      $condition1 = null;
      $condition2 = null;
      switch ($this->id) {
      case 'sub':
      $condition2 = "`sub` = 'on'";
      break;
      case 'active':
      $condition1 = "`active` = 1";
      break;
      case 'inactive':
      $condition1 = "`active` = 0";
      break;
      case 'admins':
      $condition1 = "`level` = 1";
      break;
      case 'nonadmins':
      $condition1 = "`level` = 0";
      break;
      }


      if ($condition1)
      $where1 = array(
      "sort" => 'id DESC',
      'where' => array(
      "{$condition1}"
      )
      );
      if ($condition2)
      $where2 = array(
      "sort" => 'id DESC',
      'where' => array(
      "{$condition2}"
      )
      );
      }

      $this->user = $this->user->findAll($where1);
      $this->auser = $this->auser->findAll($where2);

      foreach ($this->user as $key => $user) {
      foreach ($this->auser as $auser) {
      if ($user->id == $auser->relation_id) {
      foreach ($auser->attributes as $keyy => $attribute) {
      $this->user[$key]->$keyy = $attribute;
      }
      }
      continue;
      }
      }

      foreach ($this->user as $key => $user) {
      if (!isset($user->email))
      unset($this->user[$key]);
      }
      }
     */

    public function indexAction() {
        $this->title = 'Покажи всички потребители';
        $criteria = null;
        $this->loadPlugin("Pagination");
        $this->criteria_title = "потребителя";
        
        if (isset($this->id) && strlen($this->id) > 2) {
            switch ($this->id) {
                case 'sub':
                    $criteria = "users_info.sub = 'on'";
                    $this->criteria_title = "Абонирани потребители";
                    break;
                case 'active':
                    $criteria = "users.active = 1";
                    $this->criteria_title = "Активни потребители";
                    break;
                case 'inactive':
                    $criteria = "users.active = 0";
                    $this->criteria_title = "Неактивни потребители";
                    break;
                case 'admins':
                    $criteria = "users.level = 1";
                    $this->criteria_title = "Администратори";
                    break;
                case 'nonadmins':
                    $criteria = "users.level = 0";
                    $this->criteria_title = "Неадминистратори потребители";
                    break;
            }
            if(!is_null($criteria))
                $criteria = " AND " . $criteria;
        }

        $query = ("SELECT 
            COUNT(users.id) 
            FROM users 
            LEFT JOIN users_info ON (users_info.relation_id = users.id)
            WHERE 1 {$criteria}");
            
        $result = ActiveRecord::$db->query($query);
        $users_count = mysql_fetch_assoc($result);
        $this->users_count = $users_count['COUNT(users.id)'];
        
        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        list($limit) = $this->Pagination->getLimit(null, array('cur_page' => $page, 'count_items' => $this->users_count, 'per_page' => 100));
        
        $query = "SELECT 
                users.id, users.username, users.real_name,  users.active,
                users_info.date, users_info.email, users_info.sub
            FROM `users`
            LEFT JOIN users_info ON (users_info.relation_id = users.id)
            WHERE 1 {$criteria}
            ORDER BY users.id DESC
            LIMIT $limit
        ";
        $results = ActiveRecord::$db->query($query);
        $users = array();
        while ($row = mysql_fetch_assoc($results))
            $users[] = $row;

        $this->users = $users;
    }

    public function editAction() {
        $this->title = 'Редакция на потребител';
        $this->user_get->plugin['aUser'] = $this->auser->find(array('where' => array('relation_id' => $this->id)));
        $this->user_get->info = trim($this->user_get->info);
        $this->user_get->info = html_entity_decode($this->user_get->info);
        $this->user_get->password = '';
        foreach ($this->user_get->plugin['aUser']->attributes as $key => $value) {
            $this->user_get->attributes[$key] = $value;
        }
        $this->user_get->city_friend = $this->user_get->city_friend == 1 ? 'on' : 'off';
        $this->user_get->country_friend = $this->user_get->country_friend == 1 ? 'on' : 'off';
    }

    public function updateAction() {
        $_POST['admin_User']['city_friend'] = isset($_POST['admin_User']['city_friend']) ? '1' : '0';
        $_POST['admin_User']['country_friend'] = isset($_POST['admin_User']['country_friend']) ? '1' : '0';
        $accessible = array('real_name', 'username', 'level', 'active', 'email', 'show_email',
            'country', 'city', 'sub', 'address1', 'address2', 'post_code', 'phone', 'info',
            'pic', 'fb_page', 'own_page', 'tw_page', 'gplus_page', 'city_friend', 'country_friend'
        );

        //$this->user_get->new_password = $_POST['admin_User']['password'];
        unset($_POST['admin_User']['password']);
        if ($this->user_get->save($this->post('admin_User'), $accessible)) {
            $this->redirect('User/index');
        } else {
            $this->action('edit');
        }
    }

    public function destroyAction() {
        $this->user_get->plugin['Attachments']->delete($this->user_get->pic);
        $this->user_get->destroy();
        $this->auser->destroy();
        $this->redirect("User/index");
    }

    public function destroyPicAction() {
        if (basename($this->user_get->plugin['Attachments']->getAttachment($this->user_get->pic)) != basename(Controller::$default_pic))
            $this->user_get->plugin['Attachments']->delete($this->user_get->pic);
        //get the dir without date; example: /user_files/test_dir/second/22012 became /use_files/test_dir/second
        $dir = explode("/", $this->user_get->plugin['Attachments']->dir);
        array_pop($dir);
        $this->user_get->plugin['Attachments']->dir = join('/', $dir);
        $pic_id = $this->user_get->plugin['Attachments']->saveFromForm(\Controller::$default_pic, true);
        $this->user_get->save(array('pic' => $pic_id), array('pic'), 'destroyPic');
        $this->redirect("User/edit/" . $this->id);
    }

    public function newAction() {
        $this->title = "Нов потребител";
        $this->user->active = 0;
    }

    public function createAction() {
        $_POST['admin_User']['sub'] = isset($_POST['admin_User']['sub']) ? 'on' : 'off';
        if ($this->user->save($this->post('admin_User'), null, 'create')) {
            $this->user->save(null, null, 'destroyPic');
            $this->message = 'Потребителя беше създаден успешно';
            $this->redirect('User/index');
        } else {
            $this->action('new');
        }
    }

    public function showAction() {
        $this->title = $this->user_get->real_name;
        $this->loadPlugin("Pagination");
        $this->doc = new DocumentsController();
        $criteria = '';
        $sorting = '';
        list($selected, $join_sql, $criteria, $criteria_country, $criteria_type) = $this->doc->getDocumentType();
        $query = ("SELECT `id` FROM `documents` WHERE documents.active = 1 AND documents.user_id = {$this->id} GROUP BY documents.id");
        $result = ActiveRecord::$db->query($query);
        $documents = array();
        while ($row = mysql_fetch_row($result)) {
            $documents[] = $row;
        }
        $count_documents = count($documents);
        unset($documents);
        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        $page = 1;
        list($limit) = $this->Pagination->getLimit(null, array('cur_page' => $page, 'count_items' => $count_documents, 'per_page' => 10));

        $query = ("SELECT documents.*, documents_attachments.src, country.own_page, country.name As country_name, country_attachments.src AS country_mini_pic, document_types.name AS document_type, users.username, users.real_name {$selected}  FROM `documents` LEFT JOIN `documents_attachments` ON (documents.id = documents_attachments.relation_id) {$join_sql}  LEFT JOIN `country` ON ({$criteria_country}) LEFT JOIN `country_attachments` ON (country.mini_pic = country_attachments.id) LEFT JOIN `document_types` ON ({$criteria_type}) LEFT JOIN `users` ON (documents.user_id = users.id) WHERE documents.active = 1 AND documents.user_id = {$this->id} {$criteria} GROUP BY documents.id {$sorting} ORDER BY documents.id DESC LIMIT {$limit}");
        $result = ActiveRecord::$db->query($query);
        $documents = array();
        while ($row = mysql_fetch_assoc($result)) {
            //cut description
            $description = $row[$row['type'] . '_description'];
            if (\strlen($description) > 250) {
                $description = mb_substr($description, 0, 250) . "... ";
            }
            $description = \nl2br(html_entity_decode($description), true);
            $row[$row['type'] . '_description'] = $description;

            //get tumbnail address for picture
            if ($row['src'] != '') {
                $src = explode("/", $row['src']);
                $file = array_pop($src);
                $main_dir = "/" . join("/", $src) . "/";
                $row['src'] = $main_dir . "thumb_" . $file;
            }

            $documents[] = $row;
        }
        $this->docs = $documents;
    }

}

?>
