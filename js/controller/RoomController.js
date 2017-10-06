app.controller('RoomCtrl', function ($scope, RoomService) {
    var roundTo = 4;

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
    $scope.mode = 0;

    $scope.Q1 = 0;
    $scope.Q2 = 0;
    $scope.Q3 = 0;

    function findMedian(array, start_elem, end_elem) {
        var length = end_elem - start_elem;
        var median;
        if (length % 2 === 0) {
            median = array[end_elem / 2] + array[end_elem / 2 + 1];
        } else {
            median = array[(end_elem - 1)/2];
        }
    }

    $scope.caculateStandardDeviation = function () {
        $scope.elem_num = 0;
        $scope.errorStr = '';
        $scope.sum = 0;
        $scope.sumsq = 0;
        $scope.mean = 0;
        $scope.standard_deviation = 0;

        $scope.median = 0;
        $scope.midrange = 0;
        $scope.mode = 0;

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
        $scope.mean = ($scope.sum / $scope.elem_num).toFixed(roundTo);
        $scope.standard_deviation = (Math.sqrt($scope.sumsq / $scope.elem_num - $scope.mean * $scope.mean)).toFixed(roundTo);

        // find median
        $scope.median = findMedian($scope.sorted_list, 0, $scope.elem_num);
//        if ($scope.elem_num % 2 === 0) {
//            $scope.median = ($scope.sorted_list[$scope.elem_num / 2] * 1 + $scope.sorted_list[$scope.elem_num / 2 - 1] * 1) / 2;
//        } else {
//            $scope.median = $scope.sorted_list[($scope.elem_num - 1) / 2];
//        }

        // find midrange = (max + min) / 2
        var min = $scope.sorted_list[0];
        var max = $scope.sorted_list[$scope.elem_num - 1];
        debugger;
        $scope.midrange = (max * 1 + min * 1) / 2;

        // find mode
        var mostAppear = 0, freq = 0;
        for (var i = 0; i < $scope.elem_num - 1; i++) {
            if ($scope.sorted_list[i] == $scope.sorted_list[i + 1]) {
                freq++;
            } else {
                freq = 0;
            }

            if (freq > mostAppear) {
                mostAppear = freq;
                $scope.mode = $scope.sorted_list[i];
            }
        }

        $scope.mode = (mostAppear == 0) ? 'Dãy không có mode' : $scope.mode;

        // find Q1, Q2, Q3
        
        $scope.Q2 = $scope.median;
        $scope.Q1 = findMedian($scope.sorted_list, 0, 3);
    };
});
