app.controller('RoomCtrl', function ($scope, RoomService) {
    $scope.input_data = '';
    $scope.errorStr = '';
    
    $scope.sorted_list = [];
    $scope.elem_num = 0;
    $scope.sum = 0;
    $scope.sumsq = 0;
    $scope.mean = 0;
    $scope.standard_deviation = 0;

    $scope.median = 0; 
    $scope.midrange = 0;
    
    $scope.caculateStandardDeviation = function () {
        $scope.elem_num = 0;
        $scope.errorStr = '';
        $scope.sum = 0;
        $scope.sumsq = 0;
        $scope.mean = 0;
        $scope.standard_deviation = 0;

        $scope.median = 0;
        $scope.midrange = 0;
        
        var elems = $scope.input_data.split(';');
        $scope.sorted_list = elems.sort();
        $scope.elem_num = elems.length;
        for (var i = 0; i < elems.length; i++) {
            var elem_int = elems[i] * 1;
            if (elem_int === 'undefined' || elems[i] === '' || isNaN(elem_int)) {
                $scope.errorStr = 'Lỗi';
                return;
            }
            $scope.sum += elem_int;
            $scope.sumsq += elem_int * elem_int;
        }
        $scope.errorStr = '';
        $scope.mean = ($scope.sum / $scope.elem_num).toFixed(4);
        $scope.standard_deviation = (Math.sqrt($scope.sumsq / $scope.elem_num - $scope.mean * $scope.mean)).toFixed(4);
        
        // find median
        if($scope.elem_num % 2 === 0){
            $scope.median = ($scope.sorted_list[$scope.elem_num/2] * 1 + $scope.sorted_list[$scope.elem_num/2 - 1] * 1)/2;
        } else{
            $scope.median = $scope.sorted_list[($scope.elem_num -1) / 2];
        }
        
        // find midrange = (max + min) / 2
        $scope.midrange = ($scope.sorted_list[0] + $scope.sorted_list[$scope.elem_num - 1]) / 2;
    };
});
