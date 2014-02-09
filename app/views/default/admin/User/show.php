<div class="col_4">
    <h4><? if(strlen($title) > 1): ?><?=$title?><? else: ?>Потребител<? endif; ?></h4>
    <? if(admin_Country::getCountry($user_get->country) > 1): ?>
        <p>
            <?=admin_Country::getCountry($user_get->country); ?><? if($user_get->country_friend == 1): ?><span style="color:green;">[X]</span><? endif; ?>, <?=admin_City::getCity($user_get->city); ?><? if($user_get->city_friend == 1): ?><span style="color:green;">[X]</span><? endif; ?>
        </p>
    <? endif; ?>
    <? if(strlen($user_get->username) > 1): ?>
        <p>Потребителско име: <strong><?=$user_get->username?></strong></p>
    <? endif; ?>
    <? if(strlen($user_get->email) > 1): ?>
        <p>E-mail: <strong><?=$user_get->email?></strong></p>
    <? endif; ?>
    <p>Статус: <? if($user_get->active == 1): ?><span style="color:green;">Активен</span><? else: ?><span style="color:red">Неактивен</span><? endif; ?>
    </p>
    <!--<? if(strlen($user_get->real_name) > 1): ?>
        <p>Име: <strong><?=$user_get->real_name?></strong></p>
    <? endif; ?>-->
    <? if(strlen($user_get->address1) > 1): ?>
    <p>Адрес 1: <?=$user_get->address1?></p>
    <? endif; ?>
    <? if(strlen($user_get->address2) > 1): ?>
    <p>Адрес 2: <?=$user_get->address2?></p>
    <? endif; ?>
    <? if(strlen($user_get->post_code) > 1): ?>
    <p>Пощенски код: <?=$user_get->post_code?></p>
    <? endif; ?>
    <? if(strlen($user_get->phone) > 1): ?>
    <p>Телефон: <?=$user_get->phone?></p>
    <? endif; ?>
    <p>Права: <? if($user_get->level == 0): ?>Нормален<? else: ?>Администратор<? endif; ?></p>
    <? if(strlen($user_get->info) > 1): ?><p><?=$user_get->info?></p><? endif; ?>
    <p><? if(strlen($user_get->fb_page) > 1): ?><a href="<?=$user_get->fb_page?>" target="_blank">Facebook</a>, <? endif; ?><? if(strlen($user_get->tw_page) > 1): ?><a href="<?=$user_get->tw_page?>" target="_blank">Twitter</a>, <? endif; ?>
    <? if(strlen($user_get->gplus_page) > 1): ?><a href="<?=$user_get->gplus_page?>" target="_blank">Google+</a>, <? endif; ?></p>
    <a href="<?=$thumb = $user_get->plugin['Attachments']->getAttachment($user_get->pic)?>" target="_blank"><img src="<?=$user_get->plugin['Attachments']->getAttachment($user_get->pic, true)?>" /></a>
    
    <a href="<?="/admin/User/edit/{$id}"?>" class="button blue"><span class="icon white" data-icon="7"></span>Редакция</a>
</div>
<div class="col_3">
    <h4>Абонаменти</h4>
    <p>Емисии: <? if($user_get->sub == 'on'): ?><span style="color:green;">Абониран</span><? else:  ?><span style="color:red">Няма</span><? endif; ?></p>
<? if(empty($subs_countries) && empty($subs_cities)):?>
    <p><span style="color:red;">Няма абонаменти</span></p>
<? elseif(!empty($subs_countries)):?>
    <? foreach($subs_countries as $subscribe_country): ?>
        <p>
            <b>
                <?= admin_Country::getCountry($subscribe_country->relation_id) ?>
            </b> 
            <?=link_to("Subscribe/destroy/".$subscribe_country->code, "[x]", array('style' => 'color:red'))?> 
            <?
                if($subscribe_country->active == 0):
                    ?>
                        <span color="red">
                            Неактивен
                        </span>
                    <?
                endif;
            ?>
            <br /> 
            От: <?=date('d.m.Y', $subscribe_country->date)?>
        </p>
        <? if(!empty($subs_cities)):?>
            <? foreach($subs_cities as $key => $subscribe_city): ?>
                <? if($subscribe_country->relation_id == $cities_test[$subscribe_city->relation_id]->country_id): ?>
                    <p style="margin-left:50px;">
                        <b><?=admin_City::getCity($subscribe_city->relation_id)?></b>
                        <br />
                        От: <?=date('d.m.Y', $subscribe_city->date)?>
                        <?=link_to("Subscribe/destroy/".$subscribe_city->code, "[x]", array('style' => 'color:red'))?>
                        <?
                            if ($subscribe_city->active == 0):
                                ?>
                                <span color="red">
                                    Неактивен
                                </span>
                                <?
                            endif;
                            ?>
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
            <br />
            От: <?=date('d.m.Y', $subscribe_city->date)?>
            <?=link_to("Subscribe/destroy/".$subscribe_city->code, "[x]", array('style' => 'color:red'))?>
            <?
                if($subscribe_city->active == 0):
                    ?>
                        <span color="red">
                            Неактивен
                        </span>
                    <?
                endif;
            ?>
        </p>        
    <? endforeach;?>
<? endif; ?>
</div>

<div class="col_5">
    <h4>Документи</h4>
<? if(count($docs) < 1): ?>
    <p><span style="color:red;">Няма добавени документи</span></p>
<? else: ?>
    <ul class="alt">
        <? foreach($docs as $doc): ?>
            <li>
                <a href="/<?=$doc['own_page']?>" target="_blank"><img src="/<?=$doc['country_mini_pic']?>" alt="<?=$doc['country_name']?>" style="display: block; float:left;margin-right: 5px;" /></a>
                <? $date = strftime("%d", $doc['date']) . "<span style='text-transform:capitalize;'> " . strftime("%h", $doc['date']) . '</span> ' .  strftime("%Y", $doc['date']);?>
                <?=link_to("Documents/showDocuments/{$doc['id']}", $doc[$doc['type'] . "_name"]);?><br/><?=$doc['document_type']?>, <i><?=$date?></i>
            </li>
        <? endforeach; ?>
    </ul>
    <?=$Pagination->getPages('button-bar');?>
<? endif; ?>
</div>


