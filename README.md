# EasyLoading
A loader with animation without additional html tags. It is based on jQuery so you need to import it into your project.   
You just need to refer to the plug-in and start it directly in the script, loading animation will be shown.  
Otherwise, timeout and dismiss button is supported. To handle the event? Just set a callback.  
CSS animation files are referenced from [http://www.lanrenzhijia.com](http://www.lanrenzhijia.com/js/css3/3054.html).

## Preview
[Click here](https://yeye0922.github.io/EasyLoading) to preview the EasyLoading basic functions in html.  
[Click here](https://yeye0922.github.io/EasyLoading/advanced) to preview the EasyLoading advanced functions in html. 
Jquery dialog and container can also shows easy loader as well. This preview using jQueryUI plugin additionally.

## Version  

| version  | date | detail        | 
| :-------:|:----:|:-------------:|
| 0.1.0    | 2017.11.17 | Initial version, basic function      | 
| 0.2.0    | 2017.12.1 | Window resize listener, container mode supported      | 

## Require  

| name  | min-version | detail    | 
| :-------:|:----:|:-------------:|
| [jQuery](http://jquery.com/)   | 1.6  | DOM operation framework of JavaScript | 

## Usages   
Import 3rd plugin(jQuery).

    <script src="js/jquery-1.11.3.min.js"></script>
    
Import EasyLoading CSS and JavaScript files.

    <link rel="stylesheet" href="css/easy-loading.min.css">
    <script src="js/easy-loading.min.js"></script>
    
Showing the loading animation with some parameters.

    EasyLoading.show({
        text: $("<span>loading image</span>"),
        button:$("<span>dismiss</span>"),
        type: EasyLoading.TYPE.PACMAN
    });
    
Dismiss button can be used to close the view of animation, or your can finish it manually.  

    EasyLoading.hide();
    
In version >=0.2.0, container mode is supported which means you can show the loader in a container, such like a div tag or a 
jqueryUI dialog.  
Height and width of container should be larger than zero to avoid loader invisible.  
    
    EasyLoading.show({
        text: $("<span>container is loading</span>"),
        button:$("<span>dismiss</span>")
    }, $('#container');

Easy loading is running on singleton mode, so only one loader can be shown at the same time. If you want to switch the loader 
between two different containers, "destroy()" function should be called before fire the "show()" function.

    EasyLoading.destroy();

Destroying the loader means EasyLoading should rebuild struts for a new loader, it will takes extra time compared with fire "show()" function 
directly. If you just want to show the loader in global mode or in the same container, just call the "show()" function.
     
## Parameters  
EasyLoading.show(params) receives the following parameters.  

| param    | function      | default |
| :-------:|:-------------:|:------:|
| type     | Animation type | TYPE.BALL_PULSE|
| timeout  | Loding timeout | _null_|
| callback  | Callback function | _null_|
| text      | Loading text be shown| ""|
| button      | Dismiss button text | _null_|
| background_color | Loader background color | "black"|
| dismiss      | Click empty space to dismiss loader | false |

### 1.type
Enum below are supported. It determine the type of loading animation.  

    TYPE = {
        BALL_PULSE, BALL_CLIP_ROTATE, BALL_CLIP_ROTATE_PULSE, SQURE_SPIN, BALL_CLIP_ROTATE_MULTIPLE, 
        BALL_PULSE_RISE, BALL_ROTATE, CUBE_TRANSITION, BALL_ZIP_ZAG, BALL_ZIP_ZAG_DEFLECT, BALL_TRIANGLE_PATH, 
        BALL_SCALE, LINE_SCALE, LINE_SCALE_PARTY, BALL_SCALE_MULTIPLE, BALL_PULSE_SYNC, BALL_BEAT, 
        LINE_SCALE_PULSE_OUT, LINE_SCALE_PULSE_OUT_RAPID, BALL_SCALE_RIPPLE, BALL_SCALE_RIPPLE_MULTIPLE,
        BALL_SPIN_FADE_LOADER, LINK_SPIN_FADE_LOADER, TRIANGLE_SKEW_SPIN, PACMAN, SEMI_CIRCLE_SPIN
    };

### 2.timeout
Animation will not be stopped in default. Define this parameter thus the loading process will be terminated after "timeout" milliseconds.
    
### 3.callback
The callback function triggers when the animation is over or the cancel button is pressed.  

    EasyLoading.show({
        callback: function(event, data){
            // TODO
        }
    });
    
| event    | data      | info |
| :-------:|:-------------:|:------:|
| 'on_btn_click'     | Event | DOM click event for button click|
|'on_loader_click'     | Event | DOM click event for loader empty body click|
| 'on_loaded'      | Options | The options from "EasyLoading.show(options)"|

### 4.text
Animation prompt text. HTML tag is supported. You can customized your own text.

### 5.button
Dismiss button prompt text. HTML tag is supported. You can customized your own button.

### 6.background_color
Defined the loader background color. DOM color tag is supported, or RGB color expression string like "#001122".

### 7.dismiss
Enable this option to click the empty space of loader for dismiss. If you do not set up the dismiss button, this function should be 
useful. Callback function will be triggered as usual once you set up.

## Functions  
| function    | param      |  return | info |
| :-------:|:-------------:|:------:|:------:|
| show(param)     | refer to Parameters above | void | Show loader|
| show(param, container)     | refer to Parameters above, jQuery container for showing loader | void | Show loader in container|
| hide()      | _null_ | void | Dismiss loader|
| isRunning()    |  _null_ | bool | Whether the loader is processing or not|
| destroy()     | _null_ | void | Destroy loader|