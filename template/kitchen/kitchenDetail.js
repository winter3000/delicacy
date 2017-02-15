/**
 * Created by hxsd on 2016/11/25.,["marsFilter"]
 */
angular.module("myapp").controller("kitchenDetailCtrl",
    function($scope,$stateParams,dataFactory){
    // 解析url中的参数(通过url传递的参数，解析出来都是字符串)
    var name = $stateParams.title;
    // 查询出来要显示在view中的商品数据
    var data = dataFactory.query();
    angular.forEach(data.productList, function (item) {
        if (item.name == name) {
            $scope.product = item;
            $scope.product.imgsrc = $scope.product.imgsrc.replace("block", "item");
            return false;   // 中断forEach循环 <=> break
        }
    });
    //食谱数据
        $scope.recipes=[
            {"recipeimg":"images/recipes1.jpg","recipetxt":"1.大米洗净备用"},
            {"recipeimg":"images/recipes2.jpg","recipetxt":"2.盐，味精，糖，鸡粉，胡椒粉备用"},
            {"recipeimg":"images/recipes3.jpg","recipetxt":"7.猪肝炒至八成熟捞出备用"},
            {"recipeimg":"images/recipes4.jpg","recipetxt":"9.大米煮至开花后，下入焯好水的猪肝煮制"},
            {"recipeimg":"images/recipes5.jpg",
                "recipetxt":"10.猪肝煮制成熟时下入少许盐，糖，味精，鸡粉，胡椒粉调味。出锅时撒入小葱碎即可。"}
        ];
    //关注点击事件
        $scope.concernFlog=true;
        $scope.concern=function(){
            $scope.concernFlog=!$scope.concernFlog;
        }
});
