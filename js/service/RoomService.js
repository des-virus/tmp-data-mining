app.factory('RoomService', function ($http, $q, $log) {
    var factory = {};

    factory.get_branches = function (data) {
        return  $http.post('/getBranches/', data).then(
                function (response) {
                    return response.data;
                },
                function (response) {
                    $log.error(response.data);
                }
        );
    };

    return factory;
});