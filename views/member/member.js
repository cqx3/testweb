/**
 * Created by ljr on 2017/01/16.
 */
require(["vue","common","api","dialog"],function(Vue,app,api,dialog){
    let uToken = app.getValue('userToken'),
        uphone = app.getValue('phone'),
        jdFlag = 0,
        ujdFlag = app.getValue('jdFlag');
    if(uToken || uphone || ujdFlag) {
        app.storeValue('userInfo',JSON.stringify({materialsId: null,
            userToken: uToken,hasPoint:null,
            barcode:null,scanCount:null,
            timestamp:null,
            phone: uphone,
            jdFlag: ujdFlag
        }),'session');
    }

    var $userInfo = app.getValue("userInfo","session"),
        userInfo = JSON.parse($userInfo),
        materialsId = userInfo.materialsId,
        userToken = userInfo.userToken,
        hasPoint = userInfo.hasPoint,
        barcode = userInfo.barcode,
        scanCount = userInfo.scanCount,
        timestamp = userInfo.timestamp,
        pageNum = 1,
        pageTotal = 4,
        phone = userInfo.phone;
    for(var val in userInfo){
        if(val == 'jdFlag'){
            jdFlag = userInfo.jdFlag;
        }
    }

    var vm = new Vue({
        el:"#app",
        data:{
            isShow:true,
            phone:phone,
            array: [],
            timestamp:timestamp,
            arraylength:'',
            province:'',
            city:'',
            area:'',
            address:'',
            contacts:'',
            addphone:'',
            scanCount:scanCount,
            ctime:'',
            hasPoint:hasPoint,
            gainNum:'',
            isLastPage: false,
            prizeNum: 0,
            jdIsShow: jdFlag || 0,
            wxind: false
        },
        methods: {
            openList:function(){
                //this.isShow=false;
                pageNum++;
                winList();
            },
            ToIntegral:function(){
                app.linkTo('integralDetail');
            },
            JDdetails(el){
                window.location.href="../jd_luckyBag/luckyBag-card.html?orderId="+el.orderNo+"&phone="+phone+"&sysCode=YYX";
                /*app.linkTo('luckyBag-card',{orderId:el.orderNo,phone:phone,sysCode:"YYX"});*/
            },
            LinkToResult(el){
                app.storeValue('prize'+el.orderNo,JSON.stringify(el),"session");
                app.linkTo('lottery-result',{orderno:el.orderNo});
            },
            LinkToExt(el){
                window.location.href=el.ext;
            },
            LinkTopcs: function(el){
                //评测师
                let DATA=app.getValue("prize"+el.orderNo,"session");
                if(!DATA){
                    var prizeData = "prize"+el.orderNo;
                    app.storeValue(prizeData,JSON.stringify(el),"session");
                }
                app.linkTo("lottery-result", {orderno:el.orderNo});
            },
            LinkToredpacket: function(el){
                //微信红包
                let DATA=app.getValue("prize"+el.orderNo,"session");
                if(!DATA){
                    var prizeData = "prize"+el.orderNo;
                    app.storeValue(prizeData,JSON.stringify(el),"session");
                }//taihe001; el.prizeId
                api.toRedPayUrl(userInfo.userToken, el.orderNo, el.prizeId, 1).done(function(data){
                    if(data.code == 200) {
                        location.href = data.data;
                    } else {
                        dialog.tipDialog(data.msg);
                    }
                });
            },
            jd:function(){
                var host = 'http://'+window.location.host;
                window.location.href=host+"/cloud2.activity.api/jd/jdlottery/toJdLotteryActivity?sysCode=YYX"+"&barcode="+barcode+"&phone="+phone+"&materialsId="+materialsId+"&materialsName=''";
            },
            Info(el){
                this.ctime=time(el.ctime);
                api.getUserAddress(userToken,el.orderNo).done(data=>{
                    if(data.code==200){
                        this.province=data.data.province;
                        this.city=data.data.city;
                        this.area=data.data.area;
                        this.address=data.data.address;
                        this.contacts=data.data.contacts;
                        this.addphone=data.data.phone;
                        //中奖信息
                        var winningInfo=dialog.dialog({
                            id:"winningid",
                            className:"winningMain",
                            closeSwitch:true,
                            title:"<p class='index-server-title'>中奖信息</p>",
                            content:"<div class='winning-text'>" +
                            "<p>中奖时间："+vm.ctime+"</p>" +
                            "<p>联 系 人 ："+vm.contacts+"</p>" +
                            "<p>手机号码："+vm.addphone+"</p>" +
                            "<p>收货地址："+vm.province+vm.city+vm.area+vm.address+"</p>" +
                            "</div>",
                            footer:[{name:"",className:"winning-agree"}],
                            blindEvent:[
                                {
                                    ele:".ui-dialog-close",
                                    type:"click",
                                    fn:function(){
                                        winningInfo.close();
                                    }
                                }
                            ]
                        });
                        winningInfo.open();
                    }else{dialog.tipDialog(data.msg);}
                });
            }

        }
    });

    Vue.filter('time', function (value) {
        return new Date(value).format("yyyy年MM月dd");
    });
    //微信入口样式
    if(userInfo.jdFlag==1){pageTotal=5;vm.wxind = true;}else{pageTotal=4}
// 中奖记录
    function winList(){
        api.winList(phone,userToken,materialsId,'yn_yyx',pageNum,pageTotal).done(data=>{
            if(data.code==200){
                vm.array=vm.array.concat(data.data.list.list);
                vm.isLastPage = data.data.list.isLastPage;
                vm.arraylength=data.data.list.list.length;
                vm.gainNum=data.data.gainNum;
                vm.prizeNum = data.data.list.total;
            }else{dialog.tipDialog(data.msg);}
        });
    };
    winList();


    /* winningInfo.open();*/
    var height = $(window).height();
    $('#app').height(height);
    function time(value){
        var time = new Date(value),//中奖时间（时间戳）
            yy = time.getFullYear(), //年
            mm = time.getMonth()+ 1, //月
            dd = time.getDate(), //日
            hh = time.getHours(), //时
            min = time.getMinutes(), //分
            day = yy+"-"+mm+"-"+dd+' '+hh+':'+min;//时间
        return day;
    }
});