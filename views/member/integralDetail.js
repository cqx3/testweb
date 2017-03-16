/**
 * Created by ljr on 2017/01/17.
 */
require(["vue","common","api","dialog"],function(Vue,app,api,dialog){
    var $userInfo = app.getValue("userInfo","session"),
        userInfo = JSON.parse($userInfo),
        materialsId = userInfo.materialsId,
        userToken = userInfo.userToken;
    var vm = new Vue({
        el:"#app",
        data:{
            isInShow:true,
            isOutShow:true,
            isOut:false,
            Inarray:[],
            Outarray:[],
            Inlength:'',
            Outlength:'',
        },
        methods: {
            openInList:function(){
                this.isInShow=false;
            },
            openOutList:function(){
                this.isOutShow=false;
            },
            inCome:function(){
                this.isOut=false;
                this.isOutShow=true;
            },
            expend:function(){
                this.isOut=true;
                this.isInShow=true;
            },
        }
    });

    // 收入
    api.queryUserScanCode(userToken,'yn_yyx').done(data=>{
        if(data.code==200){
            vm.Inarray=data.data;
            vm.Inlength=data.data.length;
        }else{dialog.tipDialog(data.msg);}
    });
    //支出
    api.queryUserPointUse(userToken,materialsId).done(data=>{
        if(data.code==200){
            vm.Outarray=data.data;
            vm.Outlength=data.data.length;
        }else{dialog.tipDialog(data.msg);}
    });

    Vue.filter('time', function (value) {
        return new Date(value).format("yyyy-MM-dd");
    });
    var height = $(window).height();
    $('#app').height(height);

});