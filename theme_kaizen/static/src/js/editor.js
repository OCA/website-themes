odoo.define("theme_kaizen.editor", function(require) {
    "use strict";
    var LinkDialog = require("wysiwyg.widgets.LinkDialog");

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

odoo.define("theme_kaizen.website_theme", function(require) {
    "use strict";
    var ThemeCustomizeDialog = require("website.theme");

    ThemeCustomizeDialog.include({
        events: _.extend({}, ThemeCustomizeDialog.prototype.events, {
            "click .btn-reset-colors": "_onResetColorsClick",
        }),

        _onResetColorsClick: function() {
            var self = this;
            var url =
                "/website/static/src/scss/options/colors/user_theme_color_palette.scss";
            this._rpc({
                route: "/web_editor/reset_asset",
                params: {
                    url: url,
                    bundle_xmlid: "web.assets_common",
                },
            }).then(function() {
                self._makeSCSSCusto(url, {}).then(function() {
                    self._updateStyle(false, false, true).then(function() {
                        self._updateValues();
                    });
                });
            });
        },
    });
});
