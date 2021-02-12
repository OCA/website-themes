/* global Swiper */
odoo.define("theme_kaizen.frontend", function(require) {
    "use strict";
    var snippetAnimation = require("website.content.snippets.animation");
    var publicWidget = require("web.public.widget");
    var core = require("web.core");
    var ajax = require("web.ajax");
    var qweb = core.qweb;

    ajax.loadXML("/theme_kaizen/static/src/xml/frontend.xml", qweb);

    snippetAnimation.registry.snippetContributors = snippetAnimation.Animation.extend({
        selector: ".snippet_kaizen_contributors",
        disabledInEditableMode: false,
        _getSwiperConfig: function() {
            return {
                spaceBetween: 25,
                breakpoints: {
                    0: {
                        slidesPerView: 1.5,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 6,
                    },
                },
            };
        },
        start: function() {
            var res = this._super.apply(this, arguments);
            var $container = this.$el.find(".swiper-container");
            this.swiperInstance = new Swiper($container[0], this._getSwiperConfig());
            return res;
        },
        destroy: function() {
            this.swiperInstance.destroy();
        },
    });

    snippetAnimation.registry.snippetPosts = snippetAnimation.Animation.extend({
        selector: ".snippet_kaizen_posts",
        disabledInEditableMode: false,
        _getSwiperConfig: function() {
            return {
                spaceBetween: 35,
                autoHeight: true,
                loop: true,
                breakpoints: {
                    0: {
                        slidesPerView: 1.5,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                },
            };
        },
        start: function() {
            var res = this._super.apply(this, arguments);
            var $container = this.$el.find(".swiper-container");
            this.$swiperWrapper = this.$el.find(".swiper-wrapper");
            this._loadLatestBlogPosts()
                .then(this._renderPosts.bind(this))
                .then(
                    function() {
                        this.swiperInstance = new Swiper(
                            $container[0],
                            this._getSwiperConfig()
                        );
                    }.bind(this)
                );
            return res;
        },
        _loadLatestBlogPosts: function() {
            var websiteId = this._getContext().website_id;
            return this._rpc({
                model: "blog.post",
                method: "search_read",
                domain: [
                    ["is_published", "=", true],
                    "|",
                    ["website_id", "=", false],
                    ["website_id", "=", websiteId],
                ],
                order: "post_date desc",
                limit: 12,
            });
        },
        _renderPosts: function(posts) {
            var self = this;
            this.$swiperWrapper.html("");
            _.each(posts, function(post) {
                self.$swiperWrapper.append(
                    qweb.render("theme_kaizen.PostSlide", {
                        post: post,
                    })
                );
            });
        },
        destroy: function() {
            this.$swiperWrapper.html("");
            this.swiperInstance.destroy();
        },
    });

    publicWidget.registry.megaMenu = publicWidget.Widget.extend({
        selector: ".o_mega_menu_toggle",
        start: function() {
            this._super.apply(this, arguments);
            this.$el.parent().on("show.bs.dropdown", function() {
                if (window.innerWidth > 991) {
                    $("body").addClass("backdrop");
                }
            });
            this.$el.parent().on("hide.bs.dropdown", function() {
                $("body").removeClass("backdrop");
            });
        },
    });

    snippetAnimation.registry.snippetSiderbar = snippetAnimation.Animation.extend({
        selector: ".kaizen_snippet_sidebar",
        start: function() {
            this._super.apply(this, arguments);
            $("body").scrollspy({target: "#sidebarNavigation", offset: 300});
        },
    });

    // Hide / reveal menu
    var lastScroll = 0;

    window.addEventListener("scroll", function() {
        var currentScroll = window.pageYOffset;
        var container = document.getElementById("wrapwrap");
        var body = document.body;

        if (currentScroll <= 0 && container) {
            container.classList.remove("scroll-up");
            body.classList.remove("scroll-up");
            return;
        }

        if (
            container &&
            currentScroll > lastScroll &&
            !container.classList.contains("scroll-down")
        ) {
            // Down
            container.classList.remove("scroll-up");
            container.classList.add("scroll-down");

            body.classList.remove("scroll-up");
            body.classList.add("scroll-down");
        } else if (
            container &&
            currentScroll < lastScroll &&
            container.classList.contains("scroll-down")
        ) {
            // Up
            container.classList.remove("scroll-down");
            container.classList.add("scroll-up");

            body.classList.remove("scroll-down");
            body.classList.add("scroll-up");
        }
        lastScroll = currentScroll;
    });
});
