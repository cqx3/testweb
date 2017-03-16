fis.th(
    {
        name:"",//项目名，可选
        version:"",//版本号,可选
        paths: {//配置第三方组件
            $: "lib/zepto/zepto.min.js",
            vue: "lib/Vue/vue.2.13.js",
            dial: 'components/widget/dial.js',
        },
        shim:{
            /* 'weui': {//配置第三方组件的依赖
             deps: ['$']/!*,
             exports: 'myFunc'*!/
             },*/

        },
        framework:{
            cache: false, //开启localstorage缓存
            combo: false, // 开启合并
            comboPattern: "",
            urlPattern: "", // 静态资源加载路径模式
            urlPrefix: "" // 静态资源加载路径模式
        },
        base:['views/setfont.js',"lib/scrat/scrat.js","components/common/reset.scss"],//所有页面都会加载的资源，可以是js，css
        domain:"http://f-res.taiheiot.com/dev_res/",//配置共有静态资源域名
        deploy:"F:\\Sites\\th-m"//发布路径
    }
);