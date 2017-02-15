/**
 * Created by hxsd on 2016/11/30.
 */
//过滤器=========================================
angular.module("marsFilter")
    .filter("showByType",function(){
        return function (input,showType){
            var newInput=[];
            angular.forEach(input,function(item){
                if( showType==0 || item.type==showType){
                    newInput.push(item);
                    /*console.log(item)*/
                }
            });
            return newInput;
        };
    })
    .filter("showBylike",function(){
        return function (input){
            var newInput2=[];
            angular.forEach(input,function(item){
                if( item.floge=true){
                    newInput2.push(item);
                }
            });
            return newInput2;
        };
    });
