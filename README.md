# multi-select
Friendly multiselect combo in a simple [AngularJS](http://angularjs.org/) directive

Criticism is welcome!

##Demo
https://jsfiddle.net/andersonvioto/h26vtLsg/2/

##Usage
```
<mc-combo cf-label="myTitle" mc-data="myData" ng-model="myModel" 
          mc-display="displayName" mc-value="value" >
```

*cf-label:* is the text that will be displayed in the element

*mc-data:* must be an array object that will populate the options list.

*ng-model:* bind an array of objects that is selected in the option list

*mc-display:* (optional) key of the mc-data object that contains the text that will be displayed in the options list. Default: display

*mc-value:* (optional) key of the mc-data object that contains the value that will be bind to the model. Default: value
