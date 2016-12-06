(function(){
    'use strict'
    angular
        .module('mcComboDemo',['mcCombo'])
        .controller('mcComboDemoCtrl', ['$scope', function($scope){
            $scope.mockedAuthors=[
                {name: "Stan Lee", language:"en"},
                {name: "Victor Hugo", language:"fr"},
                {name: "Ariano Suassuna", language:"pt"},
                {name: "Fiódor Dostoiévski", language:"ru"},
                {name: "Arthur Conan Doyle", language:"en"},
                {name: "Machado de Assis", language:"pt"},
                {name: "Aldous Huxley", language:"en"},
                {name: "H.P. Lovecraft", language:"en"},
                {name: "José Saramago", language:"pt"}
            ];
            $scope.mockedOptions=[
                {display:"Portuguese", value:"pt"},
                {display:"French", value:"fr"},
                {display:"Russian", value:"ru"},
                {display:"English", value:"en"}
            ];

            $scope.filterModel=["pt", "fr", "ru", "en"];

        }])
    .filter('myFilter', function(){
        return function (items, options) {
            console.log(items);
            console.log(options);
            if (!angular.isUndefined(items) && !angular.isUndefined(options)) {
                var tempitems= [];
                angular.forEach(items, function (i) {
                    var r=false;
                    angular.forEach(options, function (d) {
                        if(angular.equals(i.language, d)) tempitems.push(i);
                    });
                });
                return tempitems;
            } else {
                return items;
            }
        };
    })
})();