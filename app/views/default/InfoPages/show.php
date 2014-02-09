<? if($flag == 'on'): ?>
    <? include $page_address;?>
<? else: ?>
    <?=$page->content?>
<? endif; ?>