# EasyLoading
A loading animation plugin without additional html tags. It is based on jQuery so you need to import it into your project.   
You just need to refer to the plug-in and start it directly in the script, loading animation will be shown.  
Otherwise, timeout and dismiss button is supported. To handle the event? Just set a callback.  
CSS animation files are referenced from [http://www.lanrenzhijia.com](http://www.lanrenzhijia.com/js/css3/3054.html).

## Version  

| version  | date | detail        | 
| :-------:|:----:|:-------------:|
| 0.0.1    | 2017.11.17 | Initial version, basic function      | 

## Require  

| name  | min-version | detail    | 
| :-------:|:----:|:-------------:|
| [jQuery](http://jquery.com/)   | 1.6  | DOM operation framework of JavaScript | 

## Usages  
[Click here](https://yeye0922.github.io/EasyLoading) to preview the EasyLoading in html.  
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
     
## Parameters  
EasyLoading.show(params) receives the following parameters.  

| param    | function      | default |
| :-------:|:-------------:|:------:|
| type     | Animation type | TYPE.SEMI_CIRCLE_SPIN|
| timeout      | Loding timeout | _null_|
| callback    | Callback function | _null_|
| text      | Loading text be shown| ""|
| button      | Dismiss button text | _null_|

### type
Enum below are supported. It determine the type of loading animation.  

    TYPE = {
        BALL_PULSE, BALL_CLIP_ROTATE, BALL_CLIP_ROTATE_PULSE, SQURE_SPIN, BALL_CLIP_ROTATE_MULTIPLE, 
        BALL_PULSE_RISE, BALL_ROTATE, CUBE_TRANSITION, BALL_ZIP_ZAG, BALL_ZIP_ZAG_DEFLECT, BALL_TRIANGLE_PATH, 
        BALL_SCALE, LINE_SCALE, LINE_SCALE_PARTY, BALL_SCALE_MULTIPLE, BALL_PULSE_SYNC, BALL_BEAT, 
        LINE_SCALE_PULSE_OUT, LINE_SCALE_PULSE_OUT_RAPID, BALL_SCALE_RIPPLE, BALL_SCALE_RIPPLE_MULTIPLE,
        BALL_SPIN_FADE_LOADER, LINK_SPIN_FADE_LOADER, TRIANGLE_SKEW_SPIN, PACMAN, SEMI_CIRCLE_SPIN
    };

### timeout
Animation will not be stopped in default. Define this parameter thus the loading process will be terminated after "timeout" milliseconds.
    
### callback
The callback function triggers when the animation is over or the cancel button is pressed.  

    EasyLoading.show({
        callback: function(event, data){
            // TODO
        }
    });
    
| event    | data      | info |
| :-------:|:-------------:|:------:|
| 'on_btn_click'     | Event | DOM click event|
| 'on_loaded'      | Options | The options from "EasyLoading.show(options)"|

### text
Animation prompt text. HTML tag is supported.

### button
Dismiss button prompt text. HTML tag is supported.

## Functions  
| function    | param      |  return | info |
| :-------:|:-------------:|:------:|:------:|
| show(param)     | refer to Parameters above | void | Show loading animation|
| hide()      | _null_ | void | Dismiss loading animation|
| isRunning()    |  _null_ | bool | Whether the loader is processing or not|