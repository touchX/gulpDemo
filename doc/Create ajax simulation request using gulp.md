# [使用gulp创建ajax模拟请求](http://www.cnblogs.com/qianlitiaotiao/p/5051727.html)

## 概述
之前一直使用gulp构建前端项目，这个基于node流并崇尚“编程而非配置”的工具让我深深的爱上了他。强大的gulp能做到的不仅仅是压缩和合并js、css，它能做到的还有更多。今天我给大家带来使用gulp前台创建ajax模拟数据。

## 解决的问题
* 开发时，后端还没完成数据输出，前端只好写静态模拟数据
* 数据太长了，将数据写在js文件里，完成后挨个改url
* 某些逻辑复杂的代码，加入或去除模拟数据时得小心翼翼
* 想要尽可能还原真实的数据，要么编写更多代码，要么手动修改模拟数据
* 特殊的格式，例如IP,随机数，图片，地址，需要去收集

## 前期准备

后台命令安装 gulp插件 ：
```
npm install --save-dev gulp-webserver
npm install --save-dev mockjs 
```

Gulpfile.js 文件内容

```
// 引入 gulp
var gulp = require('gulp'),
    Mock = require('mockjs'),
    webserver = require('gulp-webserver');

//模拟数据
var data={
    "/school/getStudent":{
        "id|+1": 1,
        "array|1": ["张三","李四","王五","赵六"]
    },
    "/api":{
        "id|+1": 100,
        "success|1-2": true,
        "city|2": {
            "310000": "上海市",
            "320000": "江苏省",
            "330000": "浙江省",
            "340000": "安徽省"
        }
    }

};

gulp.task('mock',function() {
    gulp.src('market').pipe(webserver({
        host:'localhost',
        port: 8000,
        middleware: function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Content-Language', 'zh-CN');
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            res.end(JSON.stringify((data[req.url])&&Mock.mock(data[req.url])));
            next();
        }
    }));
});
```

这里还只是简单的把返回的数据写在了gulpfile.js里，实际上我们也可以把数据放在文件里，然后require进来；

