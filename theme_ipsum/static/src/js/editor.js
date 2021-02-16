odoo.define("theme_ipsum.editor", function(require) {
    "use strict";
    var options = require("web_editor.snippets.options");
    var LinkDialog = require("wysiwyg.widgets.LinkDialog");

    /* This exits for the only purpose to be able to duplicate the custom snippets */
    options.registry.snippet_ipsum = options.Class.extend({
        onFocus: function() {
            this.$el
                .parent()
                .find(".oe_snippet_clone")
                .removeClass("d-none");
        },
    });

    LinkDialog.include({
        init: function(parent, opts, editable, linkInfo) {
            this.keepInnerHtml =
                linkInfo.className && linkInfo.className.indexOf("js_keep_html") !== -1;
            return this._super.apply(this, arguments);
        },
        save: function() {
            if (this.keepInnerHtml) {
                var data = this._getData();
                this.data.url = data.url;
                this.data.text = this.data.range.ec.innerHtml;
                this.final_data = this.data;
                this.destroyAction = "save";
                this.close();
                return Promise.resolve();
            }

            return this._super.apply(this, arguments);
        },
    });
});
