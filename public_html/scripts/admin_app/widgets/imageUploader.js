/**
 * Created by SveXteZ on 14-9-27.
 */
define([
    'knockout', 'helper/imageHelper', 'helper/viewHelper'
], function (ko, imageHelper, viewHelper) {
    "use strict";

    function imageContainer(config) {
        this.position = config.position;
        this.isMultiple = config.isMultiple;
        this.name = config.name;
        this.inputId = this.name.replace('[', '').replace(']', '') + this.position;
        this.imageSrc = ko.observable(config.defaultThumb);

        this.imageHelper = new imageHelper(this.imageSrc);
        this.isVisible = ko.observable(true);

        this.removeThumb = function () {
            document.getElementById(this.inputId).value = '';
            this.imageHelper.removeThumb();
        };
    }

    function imageUploader() {
        var that = this;

        this.images = ko.observableArray();
        this.showArrows = ko.observable(false);
        this.templatePath = viewHelper.defaultPaths.widgetsViewsPath + '/imageUploader/imageContainer';
        this.visibleThumbnails = 3;
        this.activeRightArrow = ko.observable(true);
        this.activeLeftArrow = ko.observable(false);

        this.activate = function (config) {
            var isMultiple = false;
            var defaultThumb = '';

            this.inputName = config.data.inputName + (config.data.isMultiple ? '[]' : '');
            if (!_.isUndefined(config.data.visibleThumbnails)) {
                this.visibleThumbnails = config.data.visibleThumbnails;
            }

            if (!_.isUndefined(config.data.isMultiple)) {
                isMultiple = config.data.isMultiple;
            }

            if (!_.isUndefined(config.data.defaultThumb)) {
                defaultThumb = config.data.defaultThumb;
            }

            this.images.push(new imageContainer({
                position: 0,
                isMultiple: isMultiple,
                name: this.inputName,
                defaultThumb: defaultThumb
            }));
        };

        this.picChanged = function (data, element) {
            if (this.position === 0 && that.images().length === 1) {
                that.buildImages(element.currentTarget.files);
            } else {
                this.imageHelper.updateThumb(element.currentTarget.files[0]);
            }
        };

        this.buildImages = function (files) {
            if (files && files.length > 0) {
                var thumbnail;

                if (files.length > that.visibleThumbnails) {
                    that.showArrows(true);
                }

                _.each(files, function (file, filePosition) {
                    if (filePosition > 0) {
                        thumbnail = new imageContainer({
                            position: filePosition,
                            isMultiple: false,
                            name: that.inputName
                        });

                        that.images.push(thumbnail);
                    } else {
                        thumbnail = that.images()[0];
                    }

                    thumbnail.imageHelper.updateThumb(file);

                    if (filePosition >= that.visibleThumbnails) {
                        thumbnail.isVisible(false);
                    }
                });
            }
        };

        this.removeThumb = function () {
            if (this.position > 0) {
                var currentItemPosition = this.position,
                    foundImage = false,
                    i, image;

                for (i = 0; i < that.images().length; i++) {
                    image = that.images()[i];

                    if (image.position > currentItemPosition && image.isVisible() === false) {
                        image.isVisible(true);
                        foundImage = true;
                        break;
                    }
                }

                if (foundImage === false) {
                    for (i = that.images().length - 1; i >= 0; i--) {
                        image = that.images()[i];

                        if (image.position < currentItemPosition && image.isVisible() === false) {
                            image.isVisible(true);
                            foundImage = true;
                            break;
                        }
                    }
                }

                that.images.remove(this);
            } else {
                this.removeThumb();
            }
        };

        this.findThumbByPosition = function (position) {
            var thumb = null;

            _.each(this.images(), function (image) {
                if (image.position == position) {
                    thumb = position;
                    return true;
                }
            });

            return thumb;
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
    };

    return imageUploader;
});