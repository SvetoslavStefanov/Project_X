/**
 * Created by SveXteZ on 14-9-22.
 */
define(['knockout'], function (ko) {
    "use strict";

    function imageHelper(imageSrc) {
        var translations = backEndConfig.translations.imageHelper,
            that = this;

        this.imageSrc = imageSrc;

        this.buttons = [
            {name: translations.buttons.selectImage, visible: ko.observable(true)},
            {name: translations.buttons.change, visible: ko.observable(false)},
            {name: translations.buttons.remove, visible: ko.observable(false)}
        ];

        this.updateThumb = function (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                imageSrc(e.target.result);

                that.buttons[0].visible(false);
                that.buttons[1].visible(true);
                that.buttons[2].visible(true);
            };

            reader.readAsDataURL(file);
        };

        this.removeThumb = function () {
            that.buttons[0].visible(true);
            that.buttons[1].visible(false);
            that.buttons[2].visible(false);

            imageSrc('');
        };

        this.setThumb = function (imagePath) {
            imageSrc(imagePath);

            that.buttons[0].visible(true);
            that.buttons[1].visible(false);
            that.buttons[2].visible(false);
        };
    }

    return imageHelper;
});