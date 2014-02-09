<?= $form = new FormBuilder($sign, array('action' => 'Sign/login', 'class' => 'admin_login_form')) ?>
    <h4><?= $title ?></h4>
    <div class="small-8">
        <div class="row">
            <div class="small-3 columns">
                <?= $form->label('username', 'Username', array('class' => 'right inline')) ?>
            </div>
            <div class="small-9 columns">
                <?= $form->input('username') ?>
            </div>
        </div>
        <div class="row">
            <div class="small-3 columns">
                <?= $form->label('password', 'Password', array('class' => 'right inline')) ?>
            </div>
            <div class="small-9 columns">
                <?= $form->input('password', array('type' => 'password')) ?>
            </div>
        </div>
    </div>
<div class="small-6 large-6 columns">
    <?= $form->input('submitUser', array('type' => 'submit', 'value' => 'Login', 'class' => 'button [radius round]')) ?>
</div>
<?=
$form->close()?>