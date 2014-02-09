<?=$form = new Formbuilder($page, array('enctype' => "multipart/form-data", 'class' => 'vertical'))?>
<script type="text/javascript">
</script>
<div class="col_12">
            <?=$form->label('title', 'Заглавие на страницата')?>
            <?=$form->input('title')?>

        
            <?=$form->label('content', 'Съдържание на страницата')?>
            <?=$code?>
            <!--<textarea name="textfield" id="textfield" rows="10" cols="40"></textarea><br />-->
        </div>
        
        <!--
        
            <?=$form->label('status','Скрита')?>
            <?=$form->input('status', array('type' => 'radio'))?>
            <?=$form->label('status','Видима')?>
            <?=$form->input('status', array('type' => 'radio'))?>
            <?=$form->label('status','Неактивна')?>
            <?=$form->input('status', array('type' => 'radio'))?>
        
        -->
        
        <div class="col_6">
            <?=$form->label('seo_description', 'Сео описание')?>
            <?=$form->textarea('seo_description')?>
        </div>
        <div class="col_6">
            <?=$form->label('seo_keywords', 'Сео ключови думи')?>
            <?=$form->textarea('seo_keywords')?>
        </div>
        <div class="col_12"><?=$form->input('submit_page', array('type' => 'submit', 'value' => 'Запиши', 'class' => 'blue'))?></div>
<?=$form->close()?>


