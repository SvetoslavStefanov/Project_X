<script type="text/javascript">
    var chosenCity = <?=intval($user->city)?>;
    var citiesJson = eval('(<?php echo addslashes(json_encode($cities)); ?>)');
</script> 
            <div class="col_12">
                <h4><?=$title?></h4>
            </div>
       <?=$form = new \Formbuilder($user, array('enctype' => "multipart/form-data", 'class' => 'vertical'))?>
<div class="col_4">
    <?=$form->label("real_name", "Име")?>
    <?=$form->input("real_name")?>

    <?=$form->label("username", "Потребителско име")?>
    <?=$form->input("username")?>

    <?=$form->label("email", "Email")?>
    <?=$form->input("email")?>
        
        
    <?=$form->label("address1", "Адрес №1")?>
    <?=$form->input("address1")?>


    <?=$form->label("address2", "Адрес №2")?>
    <?=$form->input("address2")?>


    <?=$form->label("post_code", "Пощенски код")?>
    <?=$form->input("post_code")?>


    <?=$form->label("phone", "Телефонен номер")?>
    <?=$form->input("phone")?>


    <?=$form->label('own_page', "Интернет Страница")?>
    <?=$form->input('own_page')?>

    <?=$form->checkbox("city_friend")?>
    <?=$form->label("city_friend", "Приятел на този град")?>
    
    <?=$form->checkbox("country_friend")?>
    <?=$form->label("country_friend", "Приятел на тази държава")?>
    
    </div><div class="col_4">


    <?=$form->label("country", "Държава")?>
    <?=$form->select("country", array('value' => $contries, 'id' => 'select_countries'))?>


    <?=$form->label("city", "Град")?>
    <?=$form->select("city", array('value' => array('value' => 0, 'content' => 'Изберете Град'), 'id' => 'select_cities'))?>


    <?=$form->label("sub", "Subscribe")?>
    <?=$form->select("sub", array('value' => array('on' , 'off')))?>


    <?=$form->label("active", "Активиран")?>
    <?=$form->select("active", array('value' => array(
        array('value' => '1', 'content' => 'Активен'), 
        array('value' => '0', 'content' => 'Неактивен'))))?>

    <?=$form->label("level", "Права")?>
    <?=$form->select("level", array('value' => array('0' , '1')))?>

    <?=$form->label("info", "Кратка информация")?>
    <?=$form->textarea("info", array('rows' => 5, 'cols' => 30))?>


    <?=$form->label('fb_page', "Facebook страница")?>
    <?=$form->input("fb_page")?>
        
    <?=$form->label('tw_page', "Twitter страница")?>
    <?=$form->input("tw_page")?>
        
    <?=$form->label('gplus_page', "Google+ страница")?>
    <?=$form->input("gplus_page")?>


    </div><div class="col_4">
</div>
<div class="clear"></div>
<div class="col_4"><?=$form->input("submitUpdate", array('type' => 'submit', 'value' => 'Регистрирай', 'class' => 'blue'))?></div>
<?=$form->close()?>