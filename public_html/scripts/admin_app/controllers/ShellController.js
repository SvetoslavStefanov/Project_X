/**
 * Created by SveXteZ on 14-7-28.
 */
define(['knockout', 'controllers/BaseController'], function (ko, BaseController) {
    "use strict";

    function ShellController() {

    }

    ShellController.prototype = new BaseController();

    return ShellController;
});