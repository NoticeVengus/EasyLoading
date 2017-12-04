/*!
 * @author      YeYe
 * @date        2017.12.1
 * @version     0.2.0
 * @requires
 * jQuery1.6+(http://jquery.com)
 * A float loader with animation, jQuery is required cause the DOM operation is based on it.
 * https://github.com/yeye0922/EasyLoading
 */

var EasyLoading = (function(){

    var that = {}, component={};
    var options;

    that.isInit = false;

    that.TIMEOUT = {
        FAST: 3000,
        MEDIUM: 5000,
        SLOW: 10000,
        INFINITY: null
    }

    that.TYPE = {
        BALL_PULSE: {name:"ball-pulse", alignCenter:true, offsetY:50, num:3, textOffsetY:40},
        BALL_CLIP_ROTATE: {name:"ball-clip-rotate", alignCenter:true, offsetY:50, num:1, textOffsetY:30},
        BALL_CLIP_ROTATE_PULSE: {name:"ball-clip-rotate-pulse", offsetX:15, offsetY:50, num:2, textOffsetY:40},
        SQUARE_SPIN: {name:"square-spin", offsetX:25, offsetY:50, num:1, textOffsetY:40, forceCenter:true},
        BALL_CLIP_ROTATE_MULTIPLE: {name:"ball-clip-rotate-multiple", offsetX:18, offsetY:50, num:2, textOffsetY:50, forceCenter:true},
        BALL_PULSE_RISE: {name:"ball-pulse-rise", alignCenter:true, offsetY:50, num:5, textOffsetY:50},
        BALL_ROTATE: {name:"ball-rotate", offsetX:5, offsetY:50, num:1, textOffsetY:50, forceCenter:true},
        CUBE_TRANSITION: {name:"cube-transition", offsetX:5, offsetY:60, num:2, textOffsetY:70, forceCenter:true},
        BALL_ZIP_ZAG: {name:"ball-zig-zag", offsetX:35, offsetY:80, num:2, textOffsetY:80, forceCenter:true},
        BALL_ZIP_ZAG_DEFLECT: {name:"ball-zig-zag-deflect", offsetX:35, offsetY:80, num:2, textOffsetY:80, forceCenter:true},
        BALL_TRIANGLE_PATH: {name:"ball-triangle-path", offsetX:5, offsetY:60, num:3, textOffsetY:60, forceCenter:true},
        BALL_SCALE: {name:"ball-scale", alignCenter:true, offsetY:80, num:1, textOffsetY:10},
        LINE_SCALE: {name:"line-scale", alignCenter:true, offsetY:60, num:5, textOffsetY:10},
        LINE_SCALE_PARTY: {name:"line-scale-party", alignCenter:true, offsetY:60, num:4, textOffsetY:10},
        BALL_SCALE_MULTIPLE: {name:"ball-scale-multiple", offsetX:30, offsetY:60, num:3, textOffsetY:40, forceCenter:true},
        BALL_PULSE_SYNC: {name:"ball-pulse-sync", alignCenter:true, offsetY:60, num:3, textOffsetY:10},
        BALL_BEAT: {name:"ball-beat", alignCenter:true, offsetY:60, num:3, textOffsetY:10},
        LINE_SCALE_PULSE_OUT: {name:"line-scale-pulse-out", alignCenter:true, offsetY:50, num:5, textOffsetY:10},
        LINE_SCALE_PULSE_OUT_RAPID: {name:"line-scale-pulse-out-rapid", alignCenter:true, offsetY:50, num:5, textOffsetY:10},
        BALL_SCALE_RIPPLE: {name:"ball-scale-ripple", offsetX:25, offsetY:50, num:1, textOffsetY:10, forceCenter:true},
        BALL_SCALE_RIPPLE_MULTIPLE: {name:"ball-scale-ripple-multiple", offsetX:25, offsetY:20, num:3, textOffsetY:50, forceCenter:true},
        BALL_SPIN_FADE_LOADER: {name:"ball-spin-fade-loader", offsetX:10, offsetY:30, num:8, textOffsetY:50, forceCenter:true},
        LINK_SPIN_FADE_LOADER: {name:"line-spin-fade-loader", offsetX:4, offsetY:30, num:8, textOffsetY:50, forceCenter:true},
        TRIANGLE_SKEW_SPIN: {name:"triangle-skew-spin", offsetX:20, offsetY:30, num:1, textOffsetY:10, forceCenter:true},
        PACMAN: {name:"pacman", offsetX:50, offsetY:60, num:5, textOffsetY:10, forceCenter:true},
        SEMI_CIRCLE_SPIN: {name:"semi-circle-spin", offsetX:20, offsetY:40, num:1, textOffsetY:20, forceCenter:true}
    };

    /**
     * Show loader with parameters
     * @param _options
     * @param container     optional to extra container for loader
     */
    that.show = function(_options, container){
        options = $.extend({}, defaults, _options);
        // set up container
        if(typeof(container)!='undefined'){
            options.container = container;
        }
        if(that.isInit){
            initStyle(options);
            $('#easy-loading-main').show();
        }
        else{
            setResizeListener();
            component.main = $("<div id='easy-loading-main' class='easy-loading-main'></div>");
            component.bkg = $("<div class='easy-loading-bkg'></div>");
            component.div = $("<div id='easy-loading-div' class='easy-loading-div'></div>");
            component.content = $("<div id='easy-loading-content'><div></div></div>");
            if(typeof(options.text)==='string'){
                component.text = $("<div id='easy-loading-text' class='easy-loading-text'></div>");
            }
            else{
                component.text = options.text;
            }
            if(options.button===null || typeof(options.button)==='string'){
                component.button = $("<button id='easy-loading-button' class='easy-loading-button'></button>");
            }
            else{
                component.button = options.button;
            }
            if(typeof(container)==='undefined'){
                component.main.css('position', 'fixed');
                component.main.append(component.bkg).append(component.div.append(component.content).append(component.text).append(component.button));
                $("body").append(component.main);
            }
            else{
                component.main.css('position', 'relative');
                component.main.append(component.bkg).append(component.div.append(component.content).append(component.text).append(component.button));
                container.append(component.main);
            }
            initStyle(options);
            that.isInit = true;
        }
        // set the timer for expire
        setTimer();
    }

    /**
     * Inner function for style configuration
     * @param options
     */
    var initStyle = function(options){
        var content = component.content;
        var main = component.main;
        // set up texts
        if(typeof(options.text)==='string'){
            component.text.empty().append(options.text).css("padding-top", options.type.textOffsetY);
        }
        else{
            component.text = options.text;
        }
        // set up buttons
        if(options.button!=null) {
            if(typeof(options.button)==='string'){
                component.button.empty().append(options.button);
            }
            else{
                component.button = options.button;
            }
            component.button.unbind().click(function(e) {
                _hide(true);
                if (options.callback != null)
                    options.callback('on_btn_click', e);
                e.stopPropagation();
            }).show();
        }
        else
            component.button.hide();
        // set up class and clean <div> tag
        content.find('div').removeClass().addClass(options.type.name).empty();
        // append <div> tag for displaying
        for(var i=0;i<options.type.num;++i){
            content.find("div").append($("<div></div>"));
        }
        // we have to deal with container situation or global situation
        if(typeof(options.container)!='undefined'){
            content.css("margin-top", options.container.height()/2-options.type.offsetY);
        }
        else{
            content.css("margin-top", main.height()/2-options.type.offsetY);
        }
        if(options.type.alignCenter||false) {
            content.css("margin-left", 0);
        }
        else {
            content.css("margin-left", main.width() / 2 - options.type.offsetX);
        }
        // click to dismiss
        if(options.dismiss){
            component.main.unbind('click');
            component.main.click(function(e){
                _hide(true);
                if(options.callback!=null)
                    options.callback('on_loader_click', e);
            });
        }
        // background color
        component.bkg.css('background-color', options.background_color);
    }

    /**
     * hide loader
     */
    that.hide = function(){
        component.main.hide();
        if(typeof(that.timer)!='undefined' && that.timer!=null)
            clearTimeout(that.timer);
    }

    /**
     * hide loader
     * @param withoutCallback
     */
    var _hide = function(withoutCallback){
        component.main.hide();
        if(typeof(that.timer)!='undefined' && that.timer!=null)
            clearTimeout(that.timer);
        if(!withoutCallback||false) {
            if (options.callback != null)
                options.callback('on_loaded', options);
        }
    }

    /**
     * destroy loader instance
     */
    that.destroy = function(){
        if(that.isInit){
            _hide(true);
            component.main.unbind();
            component.main.remove();
        }
        component = {};
        that.isInit = false;
    }

    /**
     * loader is running or not
     * @returns {*}
     */
    that.isRunning = function(){
        if(typeof(component.main)==='undefined')
            return false;
        return component.main.is(":hidden");
    }

    /**
     * set up timer
     * @param options
     */
    var setTimer = function(){
        if(options.timeout>0 && options.timeout!=null){
            that.timer = setTimeout(function () {
                _hide();
                that.timer = null;
            }, options.timeout);
        }
    }

    /**
     * window resize listener
     * @param options
     */
    var setResizeListener = function(){
        $(window).resize(function(){
            var main = component.main;
            var content = component.content;
            content.css("margin-top", main.height()/2-options.type.offsetY);
            if(options.type.forceCenter||false){
                if(options.type.alignCenter||false) {
                    content.css("margin-left", 0);
                }
                else {
                    content.css("margin-left", main.width() / 2 - options.type.offsetX);
                }
            }
        });
    }

    var defaults = {
        type: that.TYPE.BALL_PULSE,
        timeout: null,
        callback: null,
        text: "",
        button: null,
        background_color: "black",
        dismiss: false
    }

    return that;

})();
