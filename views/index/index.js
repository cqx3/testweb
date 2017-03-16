/**
 * Created by pdc on 2016/12/12.
 */
require(["vue","common","api","dialog","dial"],function(Vue,app,api,dialog,dial){
    var msg = app.getValue('msg','url'),userInfo;
        //为了程序外出旅行回来还能正常执行，保存msg
        app.storeValue("msg",msg,"session");
    //活动规则
    var rule=dialog.dialog({
        id:"ruleid",
        className:"indexRule",
        closeSwitch:true,
        title:"<p class='index-rule-title'>财运滚滚 豪礼巨献</p><p class='rule-title-p'>活动规则说明</p>",
        content:"<div class='rule-txt'>1、财运滚滚 玉溪（硬）会员专享活动<br/>"+
        "2、本活动仅对玉溪（硬）会员开放，非会员提供手机号码等相关信息申请注册会员后，方可进入活动；<br/>"+
        "本活动仅作为云南中烟为会员提供防伪验真服务的增值服务，不作为广告宣传及促销载体；<br/>"+
        "3、活动及页面中含有少量烟草相关信息，未满18岁者不得参加本次活动；<br/>"+
        "4、扫描活动指定产品二维码，完成防伪验真操作后方可进入服务平台参与活动；<br/>"+
        "5、本期活动小包首次扫码验真、条盒扫码验真均可获得防伪验真积分，使用防伪验真积分可参与抽奖活动；积分有效期为2017年11月30日，活动截止积分自动清零；<br/>"+
        "6、本次活动礼品设置有：微信现金红包、华为mate9 、三网通话费5元、三网通话费20元、三网通话费50元、三网通话费100元、云香评测师、品牌卡券，详情以当前活动实际内容为准；<br/>"+
        "7、奖品领取有效期为24小时，中奖24小时内未领取视为自动放弃；<br/>"+
        "8、活动奖品数量有限，送完即止；<br/>"+
        "9、活动中所发放的实物奖品，请在确认中奖后，填写完善的服务信息并领取奖品；活动中所发放的“三网通话费”，请领取后直接输入电话号码进行充值使用；活动中所发放的积分卡券，请领取后在对应的第三方平台进行使用；<br/>"+
        "10、活动中所发放的卡券，请进入用户中心查询使用详情；<br/>"+
        "11、为保障您的个人权益和知情权，请及时关注用户中心积分剩余提示，在有效期内及时使用；<br/>"+
        "12、在不透漏用户隐私资料的前提下，我方有权对本次活动的数据进行分析和使用；<br/>"+
        "13、活动客服热线：4006289192<br/>"+
        "温馨提示：<br/>"+
        "　　近期移动端网络页面时有网络劫持现象，用户极小概率在本次活动中部分页面看到例如弹窗、浮层、顶部或底部广告浮窗等形式的异常广告信息，此类内容非云南中烟活动和活动运营方提供，在此提醒广大用户切勿点击此类异常信息，最大化保护自身权益，活动运营方对用户自行点击异常信息后产生的所有损失及纠纷不承担任何法律责任。<br/>"+
        "　　本活动最终解释权归云南中烟工业有限责任公司所有。<br/>"+
        "</div>",
        footer:[{name:"我知道了",className:"index-agree"}],
        blindEvent:[
            {
                ele:".index-agree",
                type:"click",
                fn:function(){
                    rule.close();
                }
            }
        ]
    });
    //服务说明
    var service=dialog.dialog({
        id:"serviceid",
        className:"indexRule",
        closeSwitch:true,
        title:"<p class='index-server-title'>服务说明</p>",
        content:"<div class='server-txt'><p class='server-p'>玉溪（硬）云香服务会员平台使用协议</p>"+
        "　　在使用云香服务会员平台之前，您应当认真阅读并遵守《云香服务会员平台使用协议》（以下简称本协议），请您务必充分理解各条款内容。当您按照注册页面提示填写信息、阅读并同意本协议且完成注册程序后，即表示您已充分理解并接受本协议的全部内容，并与本公司达成协议。若您不同意本协议的内容及其相关变更，应当立即停止使用本服务。<br/>"+
        "1 定义<br/>"+
        "1.1 本协议是用户与本公司之间关于用户完成玉溪（硬）会员服务平台注册程序并使用本公司相关服务（一下简称“本服务”）所订立的协议。<br/>"+
        "1.2 “积分”是指用户在使用本服务时，由本公司发行并授予用户的应用点数，通常情况下在用户进行防伪验真后给予发放。此外，“积分” 不能抵换现金。<br/>"+
        "1.3 “积分”是指本公司根据用户消费不定期提供的应用积分，用户可以在本平台中，在本公司公布的使用项目内，以相应的积分参与会员服务。<br/>"+
        "2 用户资格<br/>"+
        "2.1 使用本服务的用户，需年满18岁，且应具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。<br/>"+
        "2.2 若该用户不具备第2.1条所述的主体资格，应承担因此而导致的一切后果，且本公司一旦发现，无需通知该用户及有权暂停、注销或永久冻结该用户的账户。<br/>"+
        "3 保密及用户信息保护<br/>"+
        "3.1用户注册或使用本服务时向本公司提供的个人资料（包括但不限于用户名、密码、地址、邮箱地址、性别、年龄、生日等信息），本公司将自动接收并记录用户数据，不公开或向任何第三方提供用户的个人资料以及用户在使用本服务时储存的非公开内容。<br/>"+
        "4 积分及积分使用说明；<br/>"+
        "4.1 “云香服务”平台作为本公司回馈消费者的增值服务平台，消费者可通过扫描产品外包装的二维码完成会员注册和产品验真，首次验真的用户本公司将发放给相应的防伪积分（即积分，以下称为“积分”）。<br/>"+
        "4.2 积分的累计只限于用户对“玉溪（硬）”产品的验真积分，每包“玉溪（硬）”产品验真、每条“玉溪（硬）”产品验真均可累计相应的积分。<br/>"+
        "4.3 本公司向用户发放的积分，可供用户在本公司会员平台上，以相应的积分兑换增值服务。<br/>"+
        "4.4 禁止积分转让、买卖等，同一用户重复注册会员账号的，本公司将不会对不同账户中的积分进行合计结算。<br/>"+
        "4.5 用户账户中的全部积分将在2017年11月30日清零，各位用户务必在活动结束前进行等值服务兑换。<br/>"+
        "4.6 用户可以随时暂停或终止使用本服务。用户在终止使用本服务并注销其账户后，其所属账户中的全部积分及与本服务有关的一切权利以及特殊优惠均终止，本公司不因此承担任何责任。<br/>"+
        "5 本服务的变更和终止<br/>"+
        "5.1 用户接受本协议即视为同意无条件接受包括本公司平台上正式发布或者基于其他方法正式设定的关于本服务的相关补充协议以及其他追加规则，此类补充协议及追加法则均为本协议不可分割的组成部分，与本协议具有同等法律效力。<br/>"+
        "5.2 变更后的规定和条件，除非本公司另有规定，一经在本公司服务平台公布后自动生效<br/>"+
        "5.3 本公司有权根据需要不时变更、修订和补充本协议的各项条件、使用规则，且毋须另行通知用户。若用户在变更后继续使用本服务的，即表示该用户已接受修订后的条件和规则。由此对用户造成的一切不利后果，本公司不承担任何责任。<br/>"+
        "5.4 用户存在下列情形的，本公司有权直接终止提供服务：<br/>"+
        "5.4.1 提供的用户信息张的主要内容不真实、不准确或不完整的情形；<br/>"+
        "5.4.2 冒用他人身份或使用伪造、编造身份使用本服务的情形；<br/>"+
        "5.4.3 在使用本服务时存在欺诈行为的情形；<br/>"+
        "5.4.4 违反本协议使用本服务的情形；<br/>"+
        "5.4.5 用户行为对本公司造成损害或者不利后果的情形；<br/>"+
        "5.4.6 其他本公司有合理理由认为应当终止的情形。<br/>"+
        "6 本服务的临时中断<br/>"+
        "6.1 本公司不对下述任一情形而导致用户的任何损害承担赔偿责任，且有权在未事先通知用户的情况下临时中断本服务的部分或全部内容：<br/>"+
        "6.1.1 本服务系统的定期维护、保养、检修或紧急维修等情形；<br/>"+
        "6.1.2 第三方对本服务系统及其有关设备实施的破坏、妨害等行为（包括对数据和代码源的篡改）；<br/>"+
        "6.1.3 电力、通讯出现故障、不稳定或升级维护，导致停电或数据传输不稳定、中断的情形；<br/>"+
        "6.1.4 台风、火灾、地震、火山、洪水、海啸、恐怖袭击、暴动、游行示威及其他不可抗力等本公司无法控制的情形。<br/>"+
        "7 免责条款<br/>"+
        "7.1 用户根据自身需求选择使用本服务，因本服务所存在的风险和一切后果将由其全部承担，并自行承担因此产生的责任与损失；<br/>"+
        "7.2 由于用户通过本服务而对其他任何第三人造成任何直接或间接的损失时（包括但不限于资金损失、数据损失等），本公司不对此承担任何赔偿责任，由用户承担由此引起的全部法律责任。<br/>"+
        "8 法律适用及管辖与其他<br/>"+
        "8.1 本协议的成立、生效、解释、变更、履行及争议解决，均适用中华人民共和国法律；<br/>"+
        "8.2 用户与本公司之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，用户同意将纠纷或争议提交本公司所在地有管辖权的人民法院管辖；<br/>"+
        "8.3 本协议下的所有通知，除本公司另行规定外，均可通过网站重要页面公告、常规信件传送等方式进行。该通知于发布之日视为已经送达所有用户。<br/>"+
        "本协议生效时间：2016年12月10日<br/>"+
        "</div>",
        footer:[{name:"我知道了",className:"index-agree"}],
        blindEvent:[
            {
                ele:".index-agree",
                type:"click",
                fn:function(){
                    service.close();
                }
            }
        ]
    });
    //会员权益
    var leaguer=dialog.dialog({
        id:"leaguerid",
        className:"indexRule",
        closeSwitch:true,
        title:"<p class='index-server-title'>会员权益</p>",
        content:"<div class='server-txt'>1.财运滚滚 玉溪（硬）会员专享活动<br/>"+
        "扫描【玉溪（硬）】烟条/烟包二维码，完成防伪验真操作注册成为会员后即可进入互动专区参与活动；<br/>"+
        "2.【首次验真积分】会员首次扫条盒/小盒二维码验真可获防伪验真积分，使用防伪验真积分可参与抽奖活动；<br/>"+
        "3.为保障您的个人权益和知情权，请及时关注【云香服务】微信公众号，以便及时咨询及享受更多会员权益；<br/>"+
        "4.在不透露用户隐私资料的前提下，我方有权对本次活动的数据进行分析和利用。<br/>"+
        "5.服务页面中含有少量烟草相关信息，未满18周岁者不得参与。<br/>"+
        "6.请谨防钓鱼网站：下拉页面即可查看官方域名 “ynzy.taiheiot.cn” 。<br/>"+
        "<p class='textCenter'>感谢您的信任，望君事事遇喜</p>"+
        "</div>",
        footer:[{name:"我知道了",className:"index-agree"}],
        blindEvent:[
            {
                ele:".index-agree",
                type:"click",
                fn:function(){
                    leaguer.close();
                }
            }
        ]
    });

    var getPoint;
    function showPoint(point){
        getPoint = dialog.dialog({
            id:"getPointid",
            className:"indexGetPoint",
            content:"<div class='index-showPoint'>"+
                "<p class='indexRed index-showPoint-p1'>恭喜您获得"+point+"积分</p>"+
                "<p class='indexRed index-showPoint-p2'>同时赠送您一份京东金融大礼包</p>"+
                "<p class='indexRed index-showPoint-p2'>请在用户中心领取使用</p>"+
                "<p class='indexGetPoint-button'>确认</p>"+
                "</div>",
            blindEvent:[
                {
                    ele:".indexGetPoint-button",
                    type:"click",
                    fn:function() {
                        getPoint.close();
                    }
                }
            ]
        });
        getPoint.open();
    }
    var lessPoint = dialog.dialog({
        id:"lessPointid",
        className:"indexLessPoint",
        title:"<p class='lessPoint-title'></p>",
        closeSwitch:true,
        content:"<div class='index-showPoint'>"+
            "<p class='indexRed index-showPoint-p1'>您的积分余额不足</p>"+
            "<p class='indexRed index-lessPoint-p2'>不能参与抽奖</p>"+
            "<p class='indexRed index-lessPoint-p3'>购买条盒获得更多积分</p>"+
            "<p class='indexRed index-lessPoint-p3' style='font-size: 0.7rem;'>正在为您跳转到用户中心...</p>"+
            "</div>",
        blindEvent:[
            {
                ele:".ui-dialog-close",
                type:"click",
                fn:function(){
                    lessPoint.close();
                }
            }
        ]
    });
    //lessPoint.open();
    //showPoint(20);
    var vm = new Vue({
        el:"#app",
        data:{
            list:[],
            listChange:0,/*判断list变化，只变化一次*/
            prize:[],
            chance:0/*抽奖机会*/,
            title:"",
            hasPoint:"",/*当前积分*/
            usePoint:"",/*抽奖所需积分*/
            time:0
        },
        methods:{
            linkTo(el){
                if(el == "member"){
                    app.linkTo("member");
                }

            },
            open(dia){
                if(dia == "service"){
                    service.open();
                }else if (dia == "leaguer"){
                    leaguer.open();
                }else{
                    rule.open();
                }
            },
            checkActivity(){
                var self = this;
                api.checkActivity(userInfo.barcode,userInfo.userToken).done(data=>{
                    if(data.code == 2034){
                        //该码已参与过活动
                        lessPoint.open();
                        setTimeout(function(){
                            app.linkTo("member");
                        },2000);
                    }else if(data.code == 200){
                        //抽奖
                        vm.chance = 1;
                        self.lottery();
                        return;
                    }else{
                        dialog.tipDialog(data.msg)
                    }

                })
            },
            lottery(){
                if(vm.chance == 1){
                    setTimeout(function(){vm.time +=1;},1000);
                    //转动转盘并且抽奖
                    dial({'dom':'#index-prize'});
                    api.doDrawLottery(userInfo.barcode,userInfo.openId,userInfo.userToken,userInfo.province,userInfo.city).done(data=>{
                        if(data.code == 200){
                            vm.hasPoint >= vm.usePoint ? vm.hasPoint = vm.hasPoint -vm.usePoint : "";
                            var data = data.data,prizeData = "prize"+data.orderNo,i,prizeName = data.prizeName;
                            app.storeValue(prizeData,JSON.stringify(data),"session");
                            if(data.prizeType==1301){
                                if(prizeName.indexOf('华为') != -1){
                                    //中ipad
                                    i = 1;
                                }
                                /*//中实物
                                if(prizeName.indexOf('评测师') != -1){
                                    //中评测师
                                    i = 7;
                                }else if(prizeName.indexOf('ad') != -1){
                                    //中ipad
                                    i = 4;
                                }else if(prizeName.indexOf('华为') != -1){
                                    //中ipad
                                    i = 1;
                                }*/
                            }else if(data.prizeType==131001){
                                //中安慰卡券礼包
                                i = 8;
                            }else if(data.prizeType==130301){
                                //中话费 注意：这里要先判断是不是50元，后判断5元的
                                if(prizeName.indexOf('50') != -1){
                                    i = 3;
                                }else if(prizeName.indexOf('20') != -1){
                                    i = 5;
                                }else if(prizeName.indexOf('100') != -1){
                                    i = 2;
                                }else if(prizeName.indexOf('5') != -1){
                                    i = 6;
                                }
                            }else if(data.prizeType == 1313){
                                i = 4;
                            }else if(data.prizeType == 1312){
                                i = 7;
                            }else{
                                //真正的未中奖
                                i = 16;
                                var runDom = '#index-prize',angle = -360/8* i - 1080;
                                dial({'dom': runDom,'status':'end','end': angle});
                                setTimeout(function(){dialog.tipDialog("很遗憾，您未中奖");},2000);
                                setTimeout(function(){ app.linkTo("member");},4000);
                            }
                            //处理转盘
                            if(i==16){
                                return;
                            }else{
                                if(vm.time!=1){
                                    setTimeout(function(){dialThis(i,data.orderNo);},800);
                                }else{
                                    dialThis(i,data.orderNo);
                                }
                            }

                        }
                    })
                }else{
                    return;
                }

            }
        },
        computed: {

        }

    });
    //处理抽奖的内容
    function dialThis(i,orderNo){
        var runDom = '#index-prize',angle = -360/8* i - 1080;
        setTimeout(function(){self.chance = 1;},1500);
        dial({'dom': runDom,'status':'end','end': angle});
        switch (i){
            case 1:
                //华为
                break;
            case 2:
                //100元话费
                break;
            case 3:
                //50元话费
                break;
            case 4:
                //ipad
                break;
            case 5:
                //20元话费
                break;
            case 6:
                //5元话费
                break;
            case 7:
                //评测师
                break;
            case 8:
                //谢谢参与
                break;
            default:
        }
        setTimeout(function(){
            if(i == 4) {
                app.linkTo("redenvelope",{orderno:orderNo});
                return;
            }
            app.linkTo("lottery-result",{orderno:orderNo});
        },1500);
    }

    vm.$watch('list.length', function (newVal, oldVal) {
        if(newVal && newVal!= null && vm.listChange != 1){
            vm.listChange = 1;
            scroll();
        }
     })

    //获取用户信息
    api.login(msg).done(data=>{
        if(data.code==200){
            var data = data.data;
            if(data.login[0]){
                vm.hasPoint = data.login[0].hasPoint;
                vm.usePoint = data.login[0].usePoint;
                userInfo = data.login[0];

                //如果该二维码是首次验证，获得了积分，则弹框提示
                if(data.login[0].mallPoint!=null && data.login[0].mallPoint!="" && app.getValue('mallPointShow',"session") != 1){
                    app.storeValue("mallPointShow",1,"session");
                    showPoint(data.login[0].mallPoint);
                }
                app.storeValue('userInfo',JSON.stringify(data.login[0]),"session");
                vm.title ="感恩相伴&nbsp;&nbsp;大奖好运连连";
                /*if(data.login[0].style == 1){
                    vm.title ="扫码领取现金好礼";
                }else{
                    vm.title ="感恩相伴&nbsp;&nbsp;大奖好运连连";
                }*/
            }
            if(data.residue.length>0){
                var prize = data.residue.map(function (item,index) {
                    return item["name"]+"还剩"+item["residue"]+"个";
                })
                vm.prize = prize;
                setInterval(function(){
                    AutoScroll($('#scrollDiv'));
                    var liWidth= $('#scrollDiv').width();
                    $('#scrollDiv p').css({'width':liWidth,' white-space':'nowrap','text-overflow':'ellipsis','overflow':'hidden'});
                },2300);
            }
            if(data.scroll.length>0){
                var list = data.scroll.map(function (item,index) {
                    var phone = item['phone'].substring(0,3)+"****"+item['phone'].substring(7,11);
                    if(item['style'] == 1){
                        //条盒
                        return "恭喜"+phone+"用户参与条盒活动获得"+item["name"];
                    }else{
                        return "恭喜"+phone+"用户参与小盒活动获得"+item["name"];
                    }
                })
                vm.list = list;
            }
        }
    });
    //左右滚动
    function scroll(){
        var time = 16.7*3;
        var li = document.querySelector("#scroll").querySelectorAll("li"),len = li.length,scrollWid = 0,bodyWid=document.querySelector("body").clientWidth,scroll = 0;
        while(len){
            scrollWid+= li[len-1].clientWidth;
            len--;
        }
        vm.list = vm.list.concat(vm.list);
        if(scrollWid > bodyWid){
                setInterval(function(){
                    if(scroll <= scrollWid){
                        scroll++;
                        $('#scroll').css('margin-left',"-"+scroll+"px");
                    }else{
                        $('#scroll').css('margin-left',"0px");
                        scroll = 0;
                    }
                },time);
        }
    };
    //上下滚动
    function AutoScroll(obj){
        var height = $('.li').height();
        $(obj).find("#ad-marquree:first").animate({
            marginTop:-height
        },600,function(){
            $(this).css({marginTop:"0px"}).find(".li:first").appendTo(this);
        });
    }

});