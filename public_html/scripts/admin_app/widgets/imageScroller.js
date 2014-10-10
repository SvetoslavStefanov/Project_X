/**
 * Created by SveXteZ on 14-10-10.
 */
define([
    'knockout'
], function (ko) {
    "use strict";

    function image(config) {

        this.src = config.src;
        this.isVisible = ko.observable(config.isVisible);
    };

    function imageScroller() {
        this.imagesPerRow = 3;
        this.activeRightArrow = ko.observable(true);
        this.activeLeftArrow = ko.observable(false);
        this.images = ko.observableArray([]);
        this.showArrows = ko.observable(false);

        this.activate = function (config) {
            if (!_.isUndefined(config.data.imagesPerRow)) {
                this.imagesPerRow = config.data.imagesPerRow;
            }

            this.setImages(config.data.images)
        };

        this.setImages = function (images) {
            var that = this,
                isImageVisible;

            _.each(images, function (imageSrc, index) {
                isImageVisible = true;

                if (index > that.imagesPerRow - 1) {
                    isImageVisible = false;
                }

                that.images.push(new image({
                    src: imageSrc,
                    isVisible: isImageVisible
                }));
            });

            if (images.length > this.imagesPerRow) {
                this.showArrows(true);
            }
        };

        this.scrollLeft = function () {
            var isImageHidden = false;

            if (this.images()[0].isVisible() === true) {
                this.activeLeftArrow(false);
                return false;
            }

            this.activeRightArrow(true);

            _.each(this.images().slice().reverse(), function (image) {
                if (image.isVisible() === false && isImageHidden === true) {
                    image.isVisible(true);
                    return false;
                }

                if (image.isVisible() === true && isImageHidden === false) {
                    image.isVisible(false);
                    isImageHidden = true;
                }
            });

            if (this.images()[0].isVisible() === true) {
                this.activeLeftArrow(false);
                return false;
            }
        };

        this.scrollRight = function () {
            var isImageHidden = false;

            if (_.last(this.images()).isVisible() === true) {
                this.activeRightArrow(false);
                return false;
            }

            this.activeLeftArrow(true);

            _.each(this.images(), function (image) {
                if (image.isVisible() === false && isImageHidden === true) {
                    image.isVisible(true);
                    return false;
                }

                if (image.isVisible() === true && isImageHidden === false) {
                    image.isVisible(false);
                    isImageHidden = true;
                }
            });

            if (_.last(this.images()).isVisible() === true) {
                this.activeRightArrow(false);
                return false;
            }
        };
    }

    return imageScroller;
});