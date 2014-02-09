<!DOCTYPE html>
<html ng-app="website">
    <head>
        <title> | Administration</title>
        <meta charset="utf-8" />

        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/main.css" type="text/css" />

        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/bootstrap/bootstrap.css" />
        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/bootstrap/bootstrap-responsive.css" />
        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/font-awesome/font-awesome.css" />
        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/ie10mobile.css" />
        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/durandal/durandal.css" />
        <link rel="stylesheet" href="<?= SITE_URL ?>/styles/samples.css" />
    </head>
    <body>
        <div id="applicationHost">
            <div class="splash">
                <div class="message">
                    Durandal Starter Project
                </div>
                <i class="icon-spinner icon-2x icon-spin active"></i>
            </div>
        </div>
        <script src="scripts/lib/require/require.js" data-main="scripts/admin_app/main"></script>
    </body>
</html>
