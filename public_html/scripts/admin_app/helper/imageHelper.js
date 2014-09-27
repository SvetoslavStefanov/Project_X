/**
 * Created by SveXteZ on 14-9-22.
 */
define(['knockout'], function (ko) {
    "use strict";

    function imageHelper() {
        var translations = backEndConfig.translations.imageHelper,
            that = this;

        this.imageHost = '#image_thumbnail';

        this.buttons = [
            {name: translations.buttons.selectImage, visible: ko.observable(true)},
            {name: translations.buttons.change, visible: ko.observable(false)},
            {name: translations.buttons.remove, visible: ko.observable(false)}
        ];

        this.updateThumb = function (data, element) {
            if (element.currentTarget.files && element.currentTarget.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $(that.imageHost).attr('src', e.target.result);

                    that.buttons[0].visible(false);
                    that.buttons[1].visible(true);
                    that.buttons[2].visible(true);
                };

                reader.readAsDataURL(element.currentTarget.files[0]);
            }
        };

        this.removeThumb = function () {
            that.buttons[0].visible(true);
            that.buttons[1].visible(false);
            that.buttons[2].visible(false);

            $(that.imageHost).attr('src', '');
        };

        this.setThumb = function (imagePath) {
            $(that.imageHost).attr('src', imagePath);

            that.buttons[0].visible(true);
            that.buttons[1].visible(false);
            that.buttons[2].visible(false);
        };
    }

    return imageHelper;
});