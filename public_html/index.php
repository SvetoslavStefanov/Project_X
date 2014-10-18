<?php
require '../app/boot.php';

function loadLayout() {
    $inAdmin = false;
    $url = explode("/", (trim(substr($_SERVER['REQUEST_URI'], strlen(PUBLIC_DIR)), '/')));

    foreach ($url as $key => $value) {
        if ($value === ADMIN_DIR) {
            $inAdmin = true;
            break;
        }
    }

    if ($inAdmin) {
        $layout = '../app/views/default/admin/layout.php';
    } else {
        $layout = '../app/views/default/layout.php';
    }

    return $layout;
}

$language = new admin_Language();
$languageConfig = [];
$languageConfig['default'] = null;
$languageConfig['languages'] = [];
$currentUser = null;

$langs = $language->findAll();

foreach ($langs as $lang) {
    $newObj = get_object_vars($lang);
    $newObj['id'] = $lang->id;

    array_push($languageConfig['languages'], $newObj);
}

if (isset($_SESSION['isAdmin'])) {
    $currentUser = admin_User::find(array('where' => array('id' => $_SESSION['isAdmin'])));
    $currentUser->pic_src = $currentUser->getUserImage();
    $currentUser->password = 'no way !';
    $defaultLangId = $currentUser->selected_lang;
} else {
    foreach ($languageConfig['languages'] as $lang) {
        if ($lang['is_default'] == 1) {
            $defaultLangId = $lang['id'];
            break;
        }
    }
}

foreach ($languageConfig['languages'] as $lang) {
    if ($lang['id'] == $defaultLangId) {
        $languageConfig['default'] = $lang;
        break;
    }
}

$translations = json_decode(file_get_contents(('scripts/translations/' . $languageConfig['default']['name'] . '.json')), true);
$constants = json_decode(file_get_contents((ROOT_DIR . '/constants.json')), true);
$publicConfig = Constants::getAll();

Constants::setConstant('translations', $translations);

Validator::init();

if (($_SERVER['REQUEST_URI'] !== PUBLIC_DIR . "/") && ($_SERVER['REQUEST_URI'] !== PUBLIC_DIR . "/" . ADMIN_DIR)) {
    $dispatcher = new Dispatcher('Article', 'index');
    $dispatcher->dispatch($_SERVER['REQUEST_URI']);
} else {
    require loadLayout();
}