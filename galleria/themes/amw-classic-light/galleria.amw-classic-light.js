/**
 * AMW Classic Theme 2013-06-06
 * http://amwhalen.com
 *
 * Licensed under the MIT license
 *
 */

(function($) {

/*global jQuery, Galleria */

Galleria.addTheme({
    name: 'amw-classic-light',
    author: 'Andy Whalen',
    css: 'galleria.amw-classic-light.css',
    defaults: {
        // set this to false if you want to show the caption all the time:
        _toggleInfo: true,
        initialTransition: 'fade',
        transition: 'slide',
        transitionSpeed: 500,
        thumbCrop:  'height'
    },
    init: function(options) {

        Galleria.requires(1.28, 'This version of AMW Classic Light theme requires Galleria 1.2.8 or later');

        // add some elements
        this.addElement('info-link','info-close','amw-fullscreen');
        this.append({
            'info' : ['info-link','info-close'],
            'stage': ['amw-fullscreen']
        });

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';

        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( click, function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

        // bind some stuff
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });

        var in_fullscreen    = false;
        var galleria         = this;

        // enter/exit fullscreen mode when button is clicked
        this.$('amw-fullscreen').click(function(event) {
            event.preventDefault();
            in_fullscreen ? galleria.exitFullscreen() : galleria.enterFullscreen();
        });

        this.bind('fullscreen_enter', function(e) {
            in_fullscreen = true;
            this.$('amw-fullscreen').addClass('open');
        });

        this.bind('fullscreen_exit', function(e) {
            in_fullscreen = false;
            this.$('amw-fullscreen').removeClass('open');
        });

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }

            this.$('info').toggle( this.hasInfo() );

            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

}(jQuery));
