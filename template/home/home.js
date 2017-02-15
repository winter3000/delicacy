/**
 * Created by hxsd on 2016/11/25.
 */
angular.module("myapp").controller("homeCtrl",
    function($scope,$ionicPopup,$http,dataFactory,$state,$ionicViewSwitcher ){
    //home热门推荐数据
    $scope.hotpros=[];
    $scope.slideimgs=[
        {"imgsrc":"images/item1.jpg"},
        {"imgsrc":"images/item2.jpg"},
        {"imgsrc":"images/item3.jpg"},
        {"imgsrc":"images/item4.jpg"},
        {"imgsrc":"images/item5.jpg"},
        {"imgsrc":"images/item6.jpg"}
    ];
    $http.get("json/kitchendetail.json").success(function(data){
        $scope.hotpros=data;
    });
    //点赞事件==================
    $scope.likeClass='icon ion-ios-heart-outline';
    $scope.homeLickAdd=function(hotpro){
        if( hotpro.floge==false){
            hotpro.like++;
            hotpro.floge=true;
            hotpro.likeClass='icon ion-ios-heart assertive'
        }else {
            hotpro.like--;
            hotpro.floge=false;
            hotpro.likeClass='icon ion-ios-heart-outline'
        }
    };
// 评论弹出窗口========================
    $scope.showPopup = function (hotpro) {
        $scope.data = {};
        // .show()方法是构造一个带输入框的对话框，可接收用户输入
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.comment">',
            title: '请输入评论',
            /*subTitle: '这是子标题',*/
            scope: $scope, // 将父控制器的$scope作为对话框子页面的scope
            buttons: [
                {text: '取消'},   // "取消"按钮
                {                   // "确认"按钮
                    text: '<b>发送</b>',
                    type: 'button-positive',
                    onTap: function (e) {   // 单击确认按钮时执行的代码
                        if (!$scope.data.comment) {
                            e.preventDefault();
                        } else {
                            hotpro.comment++;
                            return $scope.data.comment;
                        }  // 不允许用户关闭，除非输入wifi密码
                    }
                }
            ]
        });
        myPopup.then(function (res) {
            // 参数res是用户输入的wifi密码
            console.log('Tapped!', res);
        });
        // 5秒后关闭输入框
        $timeout(function () { myPopup.close(); }, 5000);
    };
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
