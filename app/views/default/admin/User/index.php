<div class="col_12">
    <p><?=link_to("User/new", "Нов потребител", array('class' => 'button small'))?> <span style="float:right;"><?=$users_count?> <?=$criteria_title?></span></p>
    <table class="sortable"  cellspacing="0" cellpadding="0">
        <thead><tr>
            <!--<th>#</th>-->
                <th>Reg Date</th>
                <th>Username</th>
                <!--<th>Level</th>-->
                <th>Real Name</th>
                <th>Email</th>
                <!--<th>Country</th>
                <th>City</th>-->
                <!--<th>Subs</th>
                <th>Act</th>-->
                <th>Action</th>
            </tr></thead>
        <tbody><?php foreach ($users as $user): ?>
            <tr>
                <!--<td><?= $value->id ?></td>-->
                <td><?= date('d.m.Y', $user['date']) ?></td>
                <td><b><?= link_to("User/show/" . $user['id'], $user['username']) ?></b></td>
                <!--<td><?= $value->attributes['level'] ?></td>-->
                <td><?= $user['real_name'] ?></td>
                <td><?= $user['email'] ?></td>
                <!--<td><?= \admin_Country::getCountry($value->attributes['country']) ?></td>
                <td><?= \admin_City::getCity($value->attributes['city']) ?></td>
                <td><?= $value->attributes['sub'] ?></td>
                <td><?= $value->attributes['active'] ?></td>-->
                <td width="17%">
                    <a href="<?= "/admin/User/show/" . $user['id'] ?>" class="button small green"><span class="icon white" data-icon="u"></span>Преглед</a>
                    <a href="<?= "/admin/User/edit/" . $user['id'] ?>" class="button small blue"><span class="icon white" data-icon="7"></span></a>
                    <a href="<?= "/admin/User/destroy/" . $user['id'] ?>" onclick='return confirm("Are you sure you want to delete it")'><span class="icon red" data-icon="x"></span></a>

                </td>
            </tr>
            <?php endforeach; ?></tbody>
    </table>
    <center>
        <?= $Pagination->getPages('button-bar'); ?>
    </center>
</div>