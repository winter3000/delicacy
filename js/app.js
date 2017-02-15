//声明专用过滤器模块
angular.module("marsFilter",[]);
//声明专用购物车模块
angular.module("marsService",[]);
//        创建主模块
var myapp=angular.module("myapp",["ionic","marsFilter","marsService"]);
//全局控制器
myapp.controller("myCtrl",function($scope){
    $scope.user=[];
});
//路由配置（$stateProvider：根据状态机导航；$urlRouterProvider：根据url导航）
myapp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state("tour",{
            url:"/tour",
            templateUrl:"template/tour/tour.html"
        })
      /*  .state("register",{
            url:"/register",
            templateUrl:"template/register/register.html"
        })*/
        .state("tabs",{
            url:"/tabs",
            abstract:true,//设为抽象的
            templateUrl:"template/tabs/tabs.html"
        })
        //嵌套的子状态，用【父.子】语法
         .state("tabs.home",{
            url:"/home",
            views:{"tab-home":{
                templateUrl:"template/home/home.html",
                controller:"homeCtrl"}}//views由name指定
         })
         .state("tabs.kitchen",{
             url:"/kitchen",
             views:{"tab-kitchen":{
                 templateUrl:"template/kitchen/kitchen.html",
                 controller:"kitchenCtrl"}}
         })
        .state("tabs.kitchenDetail", {
            url: "/kitchenDetail?:id:title", // 路由传参
            views: {"tab-kitchen": {
                cache:false,
                    templateUrl: "template/kitchen/kitchenDetail.html",
                    controller: "kitchenDetailCtrl"}}
        })
        .state("tabs.shop",{
            url:"/shop",
            views:{"tab-shop":{templateUrl:"template/shop/shop.html",
                controller:"shopCtrl"}}
        })
        .state("tabs.ording",{
            url:"/ording",
            views:{"tab-shop":{templateUrl:"template/shop/ording.html",
                controller:"shopCtrl"}}
        })
        .state("tabs.ordingDetail", {
            url: "/ordingDetail",
            views: {"tab-shop": {
                templateUrl: "template/shop/ordingDetail.html",
                controller: "shopCtrl"}}
        })
        .state("tabs.thank",{
            url:"/thank",
            views:{"tab-shop":{templateUrl:"template/shop/thank.html",
                controller: "shopCtrl"}}
        })
        .state("tabs.register",{
            url:"/register",
            views:{"tab-register":{templateUrl:"template/register/register.html"}}
        })
        .state("tabs.mypage",{
            url:"/mypage",
            views:{"tab-register":{templateUrl:"template/mypage/mypage.html",
                controller:"mypageCtrl"}}
        });
    // 默认路由
    $urlRouterProvider.otherwise("/tour");
});

// 使用工厂方法，创建的一个单例对象
// 厨房单例对象会被缓存
myapp.factory("dataFactory", function ($http) {
    var data = {productList: []};   // 一定要保存到对象中，不要直接保存到一个数组变量中
    $http.get("json/kitchendetail.json").success(function (_data, status, headers, config) {
        data.productList = _data;
    });
    return {
        query: function () {
            return data;   // 返回数据
        } // end query
    };
});
