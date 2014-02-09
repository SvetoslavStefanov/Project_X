<?=$form = new Formbuilder($project); ?>
    <?=$form->label("title", "Enter title");?>
    <?=$form->input("title")?>
    <br />
    <?=$form->label("content", "Enter content")?>
    <?=$form->textarea("content")?>
    <br />
    <?=$form->input("submit", array('type' => 'submit', 'value' => 'Save')); ?>
<?=$form->close()?>