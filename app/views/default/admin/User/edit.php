<link rel="stylesheet" href="/scripts/redactor/redactor.css" />
<script src="/scripts/redactor/redactor.min.js"></script>
<script type="text/javascript"> 
$(document).ready(
        function()
        {
            $('#admin_User_info').redactor({buttons : ['formatting', 'bold', 'italic', '|', 'unorderedlist', 'orderedlist', '|', 'image', 'link', '|', 'fontcolor', 'backcolor', '|', 'horizontalrule', 'html']});
        }
);
</script>
<script type="text/javascript">
    var chosenCity = <?=intval($user_get->city)?>;
    var citiesJson = eval('(<?php echo addslashes(json_encode($cities)); ?>)');
    var countries = <?=json_encode($contries)?>;
</script> 
            <div class="col_12">
                <h4><?=$user_get->real_name?></h4>
            </div>
       <?=$form = new \Formbuilder($user_get, array('enctype' => "multipart/form-data", 'class' => 'vertical'))?>
<div class="col_4">
    <fieldset class="checkbox">
        <legend>Профил</legend>
        <?=$form->input("real_name")?>
        <?=$form->label("email", "Email")?>
        <?=$form->input("email")?>
        <?=$form->label("username", "Потребителско име")?>
        <?=$form->input("username", array('readonly' => 'readonly', 'disabled' => 'disabled'))?>
        <?=$form->label("password", "Парола")?>
        <?=$form->input("password", array('type' => 'password', 'disabled' => 'disabled'));?>
    </fieldset>
    <fieldset class="checkbox">
        <legend>Адрес</legend>
        <?=$form->select("country", array('value' => $contries, 'id' => 'select_countries'))?>
        <?=$form->select("city", array('value' => array('value' => 0, 'content' => 'Изберете Град'), 'id' => 'select_cities'))?>
        <?=$form->input("address1")?>
        <?=$form->input("address2")?>
        <?=$form->label("post_code", "Пощенски код")?>
        <?=$form->input("post_code")?>
        <?=$form->label("phone", "Телефонен номер")?>
        <?=$form->input("phone")?>
        <?=$form->label('own_page', "Интернет Страница")?>
        <?=$form->input('own_page')?>
    </fieldset>
        
    



    
    </div>
<div class="col_4">
    <fieldset class="checkbox">
        <legend>Права</legend>
    <?=$form->select("level", array('value' => array(
        array('value' => 0, 'content' => 'Потребител') , 
        array('value' => 1, 'content' => 'Администратор')
    )))?>
        <?=$form->select("active", array('value' => array(
        array('value' => '1', 'content' => 'Потвърдил email'), 
        array('value' => '0', 'content' => 'Не е потвърдил email'))))?>
        <?=$form->select("sub", array('value' => array('Абониран за емисии' , 'Не е абониран за емисии')))?>
        <?=$form->checkbox("city_friend")?>
        <?=$form->label("city_friend", "Приятел на този град", array('class' => 'inline'))?><br/>
        <?=$form->checkbox("country_friend")?>
        <?=$form->label("country_friend", "Приятел на тази държава", array('class' => 'inline'))?>
    </fieldset>



        




    </div>
<div class="col_4">
        <a href="<?=$thumb = $user_get->plugin['Attachments']->getAttachment($user_get->pic)?>" target="_blank" style="display:block;">
            <img style="display:block;" src="<?=$user_get->plugin['Attachments']->getAttachment($user_get->pic, true)?>" />
        </a>
        <? if(basename($thumb) != basename(Controller::$default_pic)): ?>
            <?=link_to('User/destroyPic/'.$user_get->id, "Изтрии аватара")?>
        <? endif;?>
        <?=$form->input("pic", array('type' => 'file'))?>
    </div>
<div class="col_8">
    <fieldset class="checkbox">
        <legend>Социални мрежи</legend>
        <?=$form->label('fb_page', "Facebook")?>
        <?=$form->input("fb_page")?>
        <?=$form->label('tw_page', "Twitter")?>
        <?=$form->input("tw_page")?>
        <?=$form->label('gplus_page', "Google+")?>
        <?=$form->input("gplus_page")?>
        <?=$form->label('flickr_page', "Flickr")?>
        <?=$form->input("flickr_page")?>
        <?=$form->label('linkedin_page', "LinkedIn")?>
        <?=$form->input("linkedin_page")?>
        <?=$form->label('youtube_page', "YouTube")?>
        <?=$form->input("youtube_page")?>
    </fieldset>
</div>
<div class="col_12">
    <fieldset class="checkbox">
        <legend>Кратка информация</legend>
        <?=$form->textarea("info", array('rows' => 5, 'cols' => 30))?>
    </fieldset>
    <?=$form->input("submitUpdate", array('type' => 'submit', 'value' => 'Запиши', 'class' => 'blue'))?>
</div>
<div class="col_4">
    <h4>Абонаменти:</h4>
    <? if(empty($subs_countries) && empty($subs_cities)):?>
        <p>Няма абонаменти</p>
    <? elseif(!empty($subs_countries)):?>
        <? foreach($subs_countries as $subscribe_country): ?>
            <p><b><?=admin_Country::getCountry($subscribe_country->relation_id)?></b><?=link_to("Subscribe/destroy/".$subscribe_country->code, "[x]", array('style' => 'color:red'))?> От: <?=date('d.m.Y', $subscribe_country->date)?> </p>
            <? if(!empty($subs_cities)):?>
                <? foreach($subs_cities as $key => $subscribe_city): ?>

                    <? if($subscribe_country->relation_id == $cities_test[$subscribe_city->relation_id]->country_id): ?>
                        <p style="margin-left:50px;">
                            <b><?=admin_City::getCity($subscribe_city->relation_id)?></b>
                            <?=link_to("Subscribe/destroy/".$subscribe_city->code, "[x]", array('style' => 'color:red'))?>
                            От: <?=date('d.m.Y', $subscribe_city->date)?>
                        </p>
                        <? unset($subs_cities[$key]);?>
                    <? endif; ?>
                <? endforeach ?>
        <? endif; ?>
        <? endforeach; ?>
    <? endif; ?>
    <? if(!empty($subs_cities)):?>
        <? foreach($subs_cities as $subscribe_city): ?>
            <p>
                <b><?=admin_City::getCity($subscribe_city->relation_id)?></b>
                <?=link_to("Subscribe/destroy/".$subscribe_city->code, "[x]", array('style' => 'color:red'))?>
                От: <?=date('d.m.Y', $subscribe_city->date)?>
            </p>        
        <? endforeach;?>
    <? endif; ?>
</div>
<?=$form->close()?>

<div class="col_8 right"><button class="small red"><span class="icon small" data-icon="x"></span><?=link_to("User/destroy/".$user_get->id, 'Изтрий потребителя', array('onclick' => 'return confirm("Are you sure you want to delete it")', 'style' => 'color:#fff;'))?></button></div>