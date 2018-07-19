/* Copyright 2018 Onestein
 * License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl). */

odoo.define('website_theme_flexible.frontend', function(require) {
"use strict";

    var base = require('web_editor.base');

    base.ready().then(function () {
        var navbar = $('header > .navbar');

        if (navbar.attr('data-do-stick') === '1') {
            //TODO: Add nice animation
            navbar.addClass('navbar-fixed-top');
        }
    });
});
