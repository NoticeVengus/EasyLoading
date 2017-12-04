# EasyLoading
在前端交互中，加载动画必不可少，为了实现这类动画加载器，往往需要添加额外的标签，通过CSS构建动画，EasyLoading可以帮你从这些繁琐的工作中解放出来。  
通过这个项目，你只需要一行代码就可以实现全局的加载动画呈现，还可以自定义文本提示和取消按钮，或配置一个超时回调处理业务。  
如果需要在特定的标签或者浮动窗口中显示加载动画，你可以构建一个jQuery的标签对象并传递给EasyLoading。  
CSS动画从懒人之家的项目拷贝而来，详情请查看 [http://www.lanrenzhijia.com](http://www.lanrenzhijia.com/js/css3/3054.html).

## 预览
为了更好展现EasyLoading的功能，我准备了两个例子：  
[点击查看基本功能](https://yeye0922.github.io/EasyLoading) ，你只需要导入一个css和js文件，就可以在需要的地方通过一句代码呼出加载动画。  
[点击查看高级功能](https://yeye0922.github.io/EasyLoading/advanced) ，如果希望在指定的标签下显示加载动画，通过回调消息通知业务超时等，这个例子可供你做参考。  
遗憾的是，EasyLoading当前只支持单例模式，这也就意味着你只能同时显示一个加载动画:-)。没关系，如果你持续关注该项目并不吝啬star一颗小星星，我保证一定会解决这个问题(:-D。

## 版本  

| version  | date | detail        | 
| :-------:|:----:|:-------------:|
| 0.1.0    | 2017.11.17 | 基础功能实现      | 
| 0.2.0    | 2017.12.1 | 添加窗口resize监听器，支持容器模式      | 

## 依赖  

| name  | min-version | detail    | 
| :-------:|:----:|:-------------:|
| [jQuery](http://jquery.com/)   | 1.6  | DOM 脚本操作库 | 

## 使用   
导入第三方库(jQuery)。

    <script src="js/jquery-1.11.3.min.js"></script>
    
导入 CSS 和 JavaScript 文件。

    <link rel="stylesheet" href="css/easy-loading.min.css">
    <script src="js/easy-loading.min.js"></script>
    
附带参数调用方法，显示加载动画。

    EasyLoading.show({
        text: $("<span>loading image</span>"),
        button:$("<span>dismiss</span>"),
        type: EasyLoading.TYPE.PACMAN
    });
    
在上述方法中我们配置了一个按钮，通过这个按钮可以隐藏及结束加载动画，当然你也可以手动调用这个方法。  

    EasyLoading.hide();
    
在大于等于 v0.2.0 的版本中,可以在标签中添加该加载器，在[高级功能](https://yeye0922.github.io/EasyLoading/advanced) 例程中我把它添加到一个jQueryUI的浮动对话框里。  
需要注意的是，为了填充整个容器，EasyLoading的宽高配置为100%，所以用于显示加载器的容器宽高必须已确定，否则很有可能看不到加载器动画|:-<。  
在下面的例子中，我们把EasyLoading显示在一个id=container的标签容器里，只需要通过$('#container)实例化一个jQuery对象并作为第二个参数传入show()方法。
    
    EasyLoading.show({
        text: $("<span>container is loading</span>"),
        button:$("<span>dismiss</span>")
    }, $('#container');

上面已提到，目前Easy loading工作在单例模式，所以当你需要在一个全局显示的加载器和一个标签容器内加载器间来回切换的时候，需要手动调用"destroy()"销毁方法。  

    EasyLoading.destroy();

销毁一个加载器后调用"show()"方法，将会重新构建一些必要的DOM标签，会耗费些许额外的时间。  
如果你只是在相同的位置显示和隐藏该动画加载器，只需要使用"hide()"和"show()"方法即可。
     
## 参数  
EasyLoading.show(params) 方法支持以下可选参数。  

| 参数    | 功能      | 缺省值 |
| :-------:|:-------------:|:------:|
| type     | 动画类型 | TYPE.BALL_PULSE|
| timeout  | 加载器超时，单位毫秒 | _null_|
| callback  | 回调方法 | _null_|
| text      | 加载器显示的文本内容| ""|
| button      | 加载器现实的取消按钮 | _null_|
| background_color | 背景颜色 | "black"|
| dismiss      | 点击空白位置取消加载 | false |

### 1.type
支持下列枚举参数，具体动画效果可以去[基本功能](https://yeye0922.github.io/EasyLoading)例子体验。   

    TYPE = {
        BALL_PULSE, BALL_CLIP_ROTATE, BALL_CLIP_ROTATE_PULSE, SQURE_SPIN, BALL_CLIP_ROTATE_MULTIPLE, 
        BALL_PULSE_RISE, BALL_ROTATE, CUBE_TRANSITION, BALL_ZIP_ZAG, BALL_ZIP_ZAG_DEFLECT, BALL_TRIANGLE_PATH, 
        BALL_SCALE, LINE_SCALE, LINE_SCALE_PARTY, BALL_SCALE_MULTIPLE, BALL_PULSE_SYNC, BALL_BEAT, 
        LINE_SCALE_PULSE_OUT, LINE_SCALE_PULSE_OUT_RAPID, BALL_SCALE_RIPPLE, BALL_SCALE_RIPPLE_MULTIPLE,
        BALL_SPIN_FADE_LOADER, LINK_SPIN_FADE_LOADER, TRIANGLE_SKEW_SPIN, PACMAN, SEMI_CIRCLE_SPIN
    };

### 2.timeout
加载器毫秒级别超时时间，到达这个时间后加载器就会自动隐藏。如果你配置了callback，会回调"on_loaded"消息，可以在这里给用户一些超时提示或做些额外的逻辑处理。
    
### 3.callback
回调函数，在EasyLoading隐藏、超时、取消按钮按下等操作的时候会调用。  

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
加载器显示的文本提醒，可以直接输入字符串，也可以输入jQuery格式的自定义的HTML标签，如：
    
    EasyLoading.show({
        text: $("<span>loading image</span>")
    });

### 5.button
加载器的取消按钮，直接输入字符串配置该按钮的文字提醒，如果你嫌弃缺省的按钮样式（一般人都喜欢自定义吧(:-D），传入一个jQuery格式的标签也是可以的，如：

    EasyLoading.show({
        button:$("<button class='jq_float_btn' style='margin-top: 10px'>dismiss</button>")
    });

### 6.background_color
默认背景是半透明黑色，你可以修改CSS文件，或者直接从这里传入颜色标签，当然可以是RGB格式的颜色配置，如：

    EasyLoading.show({
        background_color: "#112233"
    });

### 7.dismiss
点击加载器的空白处隐藏加载器，这样你不需要配置取消按钮可以了取消加载器（不会误触吗）。

## 方法  
| function    | param      |  return | info |
| :-------:|:-------------:|:------:|:------:|
| show(param)     | refer to Parameters above | void | 显示加载器|
| show(param, container)     | refer to Parameters above, jQuery container for showing loader | void | 在容器内显示加载器|
| hide()      | _null_ | void | 隐藏加载器|
| isRunning()    |  _null_ | bool | 加载器是否在运行|
| destroy()     | _null_ | void | 销毁加载器|