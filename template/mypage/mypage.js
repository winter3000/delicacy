/**
 * Created by hxsd on 2016/11/25.
 */
angular.module("myapp").controller("mypageCtrl",
    function($scope,$ionicPopup,$http,$state,dataFactory,$ionicViewSwitcher){

//类别选择
    $scope.selected = 0;
    $scope.showType=0;
    $scope.isSelected = function (index) {
        return $scope.selected === index;
    };
    $scope.setSelected = function (index) {
        $scope.selected = index;
        $scope.showType=index;
    };
//我的菜单数据
    $scope.mymenus=[];
    $http.get("json/kitchendetail.json").success(function(data){
        $scope.mymenus=data;
    });
//菜单点击事件==============
// 查询出来要显示在view中的商品数据
    $scope.data = dataFactory.query();
// 跳转
    $scope.toDetail = function(hotpro){
        $state.go("tabs.kitchenDetail",{id:"1001",title:hotpro.name});
        // 将go有动画效果
        $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
    };

});