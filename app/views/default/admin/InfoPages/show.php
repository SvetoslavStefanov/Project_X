<div class="col_12"><h4><?=$page->title?></h4></div>
<div class="col_4"><button class="large blue"><?=link_to('InfoPages/edit/'.$page->id, 'Редактирай', array('style' => 'color:#fff;text-decoration:none;'))?></button></div>

<div class="col_4"></div>

<div class="col_4 right"><button class="small red"><?=link_to('InfoPages/destroy/'.$page->id, 'Изтрии', array('style' => 'color:#fff;text-decoration:none;'))?></button></div>
<div class="col_12" style="border:dashed 1px #c5c5c5;"><?=$page->content?></div>
