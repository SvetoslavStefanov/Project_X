define(['durandal/composition','jquery'], function(composition, $) {
    var ctor = function() {

        this.activate = function(settings) {
            console.log(settings);
            this.settings = settings;
        };

        this.getHeaderText = function(item) {
            if (this.settings.headerProperty) {
                return item[this.settings.headerProperty];
            }

            return item.toString();
        };

        this.afterRenderItem = function(elements, item) {
            var parts = composition.getParts(elements);
            var $itemContainer = $(parts.itemContainer);

            $itemContainer.hide();

            $(parts.headerContainer).bind('click', function() {
                $itemContainer.toggle('fast');
            });
        };

    };

    return ctor;
});