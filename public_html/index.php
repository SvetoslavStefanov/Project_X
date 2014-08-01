<?php
require '../app/boot.php';

function loadLayout(){
    $inAdmin = false;
    $url = explode("/", (trim(substr($_SERVER['REQUEST_URI'], strlen(PUBLIC_DIR)), '/')));

    foreach($url as $key => $value){
        if ($value === ADMIN_DIR){
            $inAdmin = true;
            break;
        }
    }

    if($inAdmin){
        $layout = '../app/views/default/admin/layout.php';
    }else{
        $layout = '../app/views/default/layout.php';
    }

    return $layout;
}

if (($_SERVER['REQUEST_URI'] !== PUBLIC_DIR . "/") && ($_SERVER['REQUEST_URI'] !== PUBLIC_DIR . "/" . ADMIN_DIR)){
    $dispatcher = new Dispatcher('Article', 'index');
    $dispatcher->dispatch($_SERVER['REQUEST_URI']);
}else{
    $language = new admin_Language();
    $languageConfig = [];
    $languageConfig['default'] = null;
    $languageConfig['languages'] = [];
    $langs = $language->findAll();

    $currentUser = Sign::find(array('where' => array('id' => $_SESSION['isAdmin'])));

    foreach ($langs as $lang) {
        $newObj = $lang->attributes;
        $newObj['id'] = $lang->id;

        array_push($languageConfig['languages'], $newObj);
    }

    foreach ($languageConfig['languages'] as $lang) {
        if ($lang['id'] == $currentUser->attributes['selected_lang']) {
            $languageConfig['default'] = $lang;
        }
    }

    $translation = new admin_Translation();
    $translationsObj = $translation->findAll(array('where' => array('language_id' => $currentUser->attributes['selected_lang'])));
    $translations = [];
    foreach ($translationsObj as $trs) {
        array_push($translations, $trs->attributes);
    }

    require loadLayout();
}