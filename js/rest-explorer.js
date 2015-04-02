angular.module('rest.api.explorer', ['ui.bootstrap', 'ngCookies'])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }]);
angular.module('rest.api.explorer').controller('ApiExplorerController', function ($scope, $http, $cookies) {

    $scope.loginName = 'xx';
    $scope.loginPassword = 'xx';
    $scope.host = 'localhost:3000';
    $scope.corsHost = 'http://localhost:9292';
    $scope.logged = false;
    $scope.loginCookie = '17aa1cb622af31cbe01cf2ca3a876ddddba8f6af';
    $scope.pfields = 'id';

    $scope.login = function () {
      $scope.lastUrl = $scope.host + '/login?user=' + $scope.loginName + '&pwd=' + $scope.loginPassword;
      $http.get($scope.corsHost + '/' + $scope.lastUrl)
        .success(function (data) {
          $scope.logged = true;
          $scope.lastResponse = data;
        }).error(function (data, status) {
          $scope.logged = false;
          $scope.lastResponse = data;
          alert('error:' + status + " (Did you start corsproxy?)");
        });
    };
    $scope.loginWithCookie = function () {
      $scope.lastUrl = $scope.host + '/user';
      $cookies.vlindr = $scope.loginCookie;
      $http.get($scope.corsHost + '/' + $scope.lastUrl)
        .success(function (data) {
          $scope.logged = true;
          $scope.lastResponse = data;
        }).error(function (data, status) {
          $scope.logged = false;
          $scope.lastResponse = data;
          alert('error:' + status + " (Did you start corsproxy?)");
        });
    };

    $scope.lastResponse = 'last response comes here';
    $scope.lastUrl = 'last url comes here';


    $scope.getCsssInput = function () {
      doGet($scope.host + '/service/listcss/i');
    };

    $scope.getCsssOutput = function () {
      doGet($scope.host + '/service/listcss/o');
    };


    $scope.getXsds = function () {
      doGet($scope.host + '/service/xsds', $scope.pfields);
    };


    function doGet(url, fields) {
      var params = [];
      if (fields) {
        params.push({name: 'fields', value: fields});
      }
      url = makeUrl(url, params);
      $scope.lastUrl = url;
      $http.get($scope.corsHost + '/' + url)
        .success(function (data) {
          $scope.lastResponse = data;
        }).error(function (data, status) {
          $scope.lastResponse = data;
          alert('error:' + status + " (Did you start corsproxy?)");
        });
    }

    function makeUrl(url, params) {
      for (var i = 0; i < params.length; i++) {
        if (i == 0) {
          url = url + '?';
        } else {
          url = url + '&';
        }

        url = url + params[i].name + '=' + params[i].value;
      }
      return url;
    }

    function addOptionalParam(params, name, value) {
      if (value) {
        params.push({name: name, value: value});
      }
    }

    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';


// POST
    $scope.body = '{ }';
    $scope.postProductType = function () {
      var url = $scope.host + '/xxx';
      if ($scope.productTypeId) {
        url += '/' + $scope.id;
      }


      $scope.lastUrl = makeUrl(url, []);

      $scope.lastResponse = 'Waiting for response...';
      $http.post($scope.corsHost + '/' + url, $scope.productTypeBody)
        .success(function (data) {
          $scope.lastResponse = JSON.stringify(data);
        }).error(function (data, status) {
          $scope.lastResponse = data;
          alert('error:' + status + " (Did you start corsproxy?)");
        });
    }
  }
)
;