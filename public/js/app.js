var app = angular.module('myApp', []);

app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
});

app.constant('URL', 'data/');

app.factory('DataService', function($http, URL) {
    var getData = function() {
        return $http.get(URL + 'content.json');
    };

    return {
        getData: getData
    };
});

app.factory('TemplateService', function($http, URL) {
    var getTemplates = function() {
        return $http.get(URL + 'templates.json');
    };

    return {
        getTemplates: getTemplates
    };
});

app.controller('ContentCtrl', function(DataService) {
    var ctrl = this;

    ctrl.content = [];

    ctrl.fetchContent = function() {
        DataService.getData().then(function(result) {
            ctrl.content = result.data;
        });
    };

    ctrl.fetchContent();
});

app.directive('contentItem', function($compile, TemplateService) {
    var getTemplate = function(templates, contentType) {
        var template = '';
        switch (contentType) {
            case 'goodForm':
                template = templates.goodForm;
                break;
            case 'warningMessage':
                template = templates.warningMessage;
                break;

        }
        return template;
    };


    var linker = function(scope, element, attrs) {
        scope.rootDirectory = '';
        var countMax = 3;
        var count = 0;
        scope.userActions = function() {
            //count === countMax ? count-- : count++;
            console.log(scope);
        };

        TemplateService.getTemplates().then(function(response) {
            var templates = response.data;

            element.html(getTemplate(templates, scope.content.content_type));

            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: 'E',
        link: linker,
        scope: {
            content: '=',
            count: '='
        }
    };
});