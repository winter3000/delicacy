/**
 * Created by hxsd on 2016/11/25.,$ionicViewSwitcher,shopFactory
 */
angular.module("myapp").controller("shopCtrl",
    function($scope,$state,$ionicPopup,$http,cartShop,$timeout){
    //搜索框显示============
    $scope.float=false;
    //类别数据========
        $scope.shopCates=[];
        $http.get("json/shopcates.json").success(function(data){
            $scope.shopCates=data;
        });
    //大图数据===========
    $scope.shopPros=[];
    $http.get("json/shopdata.json").success(function(data){
        $scope.shopPros=data;
    });
    //类别点击事件========
    $scope.showType=0;//初始值
    $scope.cateChose=function(cate){
        $scope.showType=cate.type;
    };
   //商品点击事件==============
    $scope.totalNumber=0;//初始值
    $scope.cartDate=cartShop.findAll();//拿到购物车所有商品

    $scope. shopChose=function(pro){
        cartShop.add(pro);//添加商品
        //拿到购物车所有商品
        $scope.cartDate=cartShop.findAll();
        //计算全部商品数量
        $scope.totalNumber=(function(){
            var total=0;
            angular.forEach($scope.cartDate,function(item){
                total+=item.number;
            });
            return total;
        })();
        //弹出提示信息
        // .alert()构造一个警告信息框，只带一个“确认”按钮，起到通知的作用
        var myPopup=$ionicPopup.alert({
            /*title: '警告',*/
            template: pro.name+'已加入购物车',
            buttons: [{text:"确定"}]
        });
        $timeout(function () {
            myPopup.close(); // 5秒后关闭输入框
        }, 800);
    };
    //计算总金额
    $scope.summary=(function(){
        var total=0;
        angular.forEach($scope.cartDate,function(item){
            total+=item.number*item.product.price;
        });
        return total;
    })();
         /*    //商品点击事件==============
    // 查询出来要显示在view中的商品数据
    $scope.data = shopFactory.query();
    // 跳转
    $scope.toDetail = function(shopPro){
        $state.go("tabs.kitchenDetail",{id:"1001",title:shopPro.title});
        // 将go有动画效果
        $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
    };*/
});

