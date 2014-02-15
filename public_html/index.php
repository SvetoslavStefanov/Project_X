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
//s8uhk67th6ty
sif (($_SERVER['REQUEST_URI'] !== PUBLIC_DIR . "/") && ($_SERVER['REQUEST_URI'] !== PUBLIC_DIR . "/" . ADMIN_DIR)){
    $dispatcher = new Dispatcher('Article', 'index');
    $dispatcher->dispatch($_SERVER['REQUEST_URI']);
}else{
    require loadLayout();
}