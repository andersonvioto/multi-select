/**
 * @name mcCombo - Multiselect Combination Box
 * @desc AngularJs directive that receive an option list to render a multiselectable combination box
 * @requires ngModel
 *
 * @param{string} msLabel Display text in combination box
 * @param{Array<Object>} mcData Array object with the data tha will be displayed
 * @param{string} mcDisplay (Optional) Field in mcData with the object display name (default:"display")
 * @param{string} mcValue (Optional) Field in mcData with the object value (default:"value")
 *
 * @example
 * <mc-combo cf-label="myTitle" mc-data="myData" mc-display="displayName" mc-value="value" ng-model="myModel" >
 * @author Anderson Vioto <https://github.com/andersonvioto/multi-select>
 */
(function() {
    'use strict';
    angular
        .module('mcCombo', [])
        .directive('mcCombo', [mcCombo]);
    function mcCombo() {
        return {
            require: 'ngModel',
            restrict: 'E',
            template:'<div><div class="mcCombo" ng-class="{\'mcOpened\':mcOpened}"><span class="mcLabel" ng-click="mcOpenOptions()"><span class="mcClear"><b ng-if="mcShowClear" title="clean" ng-click="mcCleanFilter($event)">X</b></span>  {{mcLabel}} <b class="mcNuIcon">&nu;</b></span></div><div class="mcOptions"  ng-class="{\'mcOpened\':mcOpened}" ><ul><li ng-repeat="i in mcData | orderBy:mcDisplay"><label><input type="checkbox" ng-model="mcOptLink[i[mcValue]]"> {{i[mcDisplay]}}</label></li></ul></div></div>',
            scope:{
                mcLabel:"@",
                mcData: "=",
                mcDisplay:"@?",
                mcValue:"@?"
            },
            link: function (scope, element, attr, ctrl) {
                if (!scope.mcDisplay) scope.mcDisplay="display";
                if (!scope.mcValue) scope.mcValue="value";

                scope.mcOptLink={}; //lista as opções e determina se estão ativas ou não
                scope.mcOpened=false; //define se as opções serão exibidas
                scope.mcShowClear=false; //define se o ícone de limpar filtro será exibido

                /** Define todas as opções como true */
                scope.mcCleanFilter=function(ev){
                    ev.stopPropagation();
                    scope.mcData.forEach(function(i){scope.mcOptLink[i[scope.mcValue]]=true;});
                };

                /** Exibe/Oculta a lista de opções */
                scope.mcOpenOptions=function(){
                    scope.mcOpened=!scope.mcOpened;
                };

                /** Observa o objeto lista e refaz as opções caso necessário */
                scope.$watchCollection("mcData", function(n){
                    n.forEach(function(i){
                        var t=false;
                        if (ctrl.$modelValue){
                            ctrl.$modelValue.forEach(function(c){
                                if(c==i[scope.mcValue]) t=true;
                            });
                        }
                        scope.mcOptLink[i[scope.mcValue]]=t;
                    });
                });

                /** Observa o opjeto cfOptLink e efetua vínculo com o Model*/
                scope.$watchCollection("mcOptLink", function(n){
                    var r=[];
                    var s=false;
                    for (var i in n){
                        if(n[i]){
                            if (isNaN(i))r.push(i);
                            else r.push(Number(i));
                        }else s=true;
                    }
                    scope.mcShowClear=s;
                    ctrl.$setViewValue(r);
                    ctrl.$render();
                });

                /** Observa o Model vinculado e aplica alterações no objeto mcOptLink */
                scope.$watch(function(){return ctrl.$modelValue},function(n){
                    scope.mcData.forEach(function(i){
                        var t=false;
                        n.forEach(function(c){
                            if(c==i[scope.mcValue]) t=true;
                        });
                        scope.mcOptLink[i[scope.mcValue]]=t;
                    });
                });

                /** Observa se houve clique fora do elemento para ocultar lista de opções eventualmente exibido */
                document.body.addEventListener('click', listener ,false);
                function listener(event){
                    if (isChildren(event.target)) return;
                    scope.$apply(function(){
                        scope.mcOpened=false;
                    });
                }

                function isChildren(target) {
                    var node = target.parentNode;
                    while (node != null) {
                        if (node == element[0]) {
                            return true;
                        }
                        node = node.parentNode;
                    }
                    return false;
                }

                scope.$on('$destroy',function(){
                    document.body.removeEventListener('click',listener,false);
                })
            }
        };
    }
})();
