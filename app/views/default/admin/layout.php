<!DOCTYPE html>
<html>
<head>
    <title>Administration</title>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>

    <link rel="stylesheet" href="<?= SITE_URL ?>/styles/main.css" type="text/css"/>
    <link rel="stylesheet" href="<?= SITE_URL ?>/plugins/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="<?= SITE_URL ?>/styles/MoneAdmin.css"/>
    <link rel="stylesheet" href="<?= SITE_URL ?>/plugins/Font-Awesome/css/font-awesome.min.css" />
    <script>
        var backEndConfig = {};
        backEndConfig.language = <?php echo json_encode($languageConfig) ?>;
        backEndConfig.currentUser = <?php echo json_encode($currentUser) ?>;
        backEndConfig.translations = <?php echo json_encode($translations) ?>;
    </script>
</head>
<body class="padTop53 ">
<div id="wrap">
    <div class="splash">
        <div class="message">
            Durandal Starter Project
        </div>
        <i class="icon-spinner icon-2x icon-spin active"></i>
    </div>
</div>
<script src="scripts/lib/require/require.js" data-main="scripts/init"></script>
</body>
</html>
