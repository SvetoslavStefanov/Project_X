<div class="col_4">
    <h4><?=$title?></h4>
</div>
<div class="col_8">
    <? foreach($validations as $validation):?>
        <? $unique_validations[$validation->id] = $validation->address1; ?>
    <? endforeach; ?>
    <? foreach(array_unique($unique_validations) as $validation): ?>
        <?=link_to("Validations/show/" . base64_encode($validation), $validation)?>
        <br />
    <? endforeach; ?>
</div>