/**
 * Created by hxsd on 2016/11/25.,["marsFilter"]
 */
angular.module("myapp").controller("kitchenCtrl",
    function($scope,$state,$ionicPopup,$http,$ionicViewSwitcher,dataFactory,$timeout){
        $scope.isLike=false;
   //类别选择
    $scope.kitchenCates=[
        { name:"所有",floge:true,type:0},
        { name:"肉食类",floge:false,type:1},
        { name:"蔬菜类",floge:false,type:2},
        { name:"米饭类",floge:false,type:3},
        { name:"海鲜水产",floge:false,type:4}
    ];
    //类别点击事件==============
    $scope.showType=0;//初始值
    $scope.choseCate=function(cate){
        angular.forEach($scope.kitchenCates,function(item){
            item.floge=false;
        });
        cate.floge=true;
        $scope.showType=cate.type;
    };
    //kitchen菜单数据========
    $scope.hotpros=[];
    $http.get("json/kitchendetail.json").success(function(data){
        $scope.hotpros=data;
        $scope.hotproscopy=data;
    });
    //菜单--喜欢点击事件=========
    $scope.listName=function(typeL){
        if(typeL=="likeL"){
            var newInput2=[];
            angular.forEach($scope.hotpros,function(item){
                if( item.floge==true){newInput2.push(item);}
            });
            $scope.hotpros=newInput2;
        }else{
            $scope.hotpros=$scope.hotproscopy;
        }
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
});
