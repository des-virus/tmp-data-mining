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
    $scope.sA = 0;

    $scope.median = 0;
    $scope.midrange = 0;
    $scope.mode = 0;

    $scope.Q1 = 0;
    $scope.Q2 = 0;
    $scope.Q3 = 0;

    $scope.j_decimal = 0;
    $scope.vi_decimal = [];
    $scope.vi_zscore = [];
    $scope.vi_minmax = [];

    $scope.vi_min = 0;
    $scope.vi_max = 0;

    function findMedian(array, start_pos, end_pos) {
        // +1 because from 0
        var length = end_pos - start_pos + 1;
        var median;
        if (length % 2 === 0) {
            var pos1 = Math.floor((end_pos - start_pos) / 2) + start_pos;
            median = (array[pos1] * 1 + array[pos1 + 1] * 1) / 2;
        } else {
            var pos1 = Math.ceil((end_pos - start_pos - 1) / 2) + start_pos;
            median = array[pos1] * 1;
        }
        return median;
    }

    $scope.caculateStandardDeviation = function () {
        $scope.elem_num = 0;
        $scope.errorStr = '';
        $scope.sum = 0;
        $scope.sumsq = 0;
        $scope.mean = 0;
        $scope.standard_deviation = 0;
        $scope.sA = 0;

        $scope.median = 0;
        $scope.midrange = 0;
        $scope.mode = 0;

        $scope.sorted_list = [];
        var tmp_list = [];

        $scope.vi_decimal = [];
        $scope.vi_zscore = [];
        $scope.vi_minmax = [];
        $scope.j_decimal = 0;


        var elems = $scope.input_data.split(';');
        $scope.elem_num = elems.length;
        for (var i = 0; i < elems.length; i++) {
            var elem_int = elems[i] * 1;
            if (elem_int === 'undefined' || elems[i] === '' || isNaN(elem_int)) {
                $scope.errorStr = 'Lỗi';
                return;
            }
            $scope.sum += elem_int;
            $scope.sumsq += elem_int * elem_int;
            tmp_list.push(elem_int);
        }
        $scope.sorted_list = tmp_list.sort(function (a, b) {
            return a - b
        });

        $scope.errorStr = '';
        $scope.mean = ($scope.sum / $scope.elem_num).toFixed(roundTo);
        $scope.standard_deviation = (Math.sqrt($scope.sumsq / $scope.elem_num - $scope.mean * $scope.mean)).toFixed(roundTo);

        // find median
        $scope.median = findMedian($scope.sorted_list, 0, $scope.elem_num - 1);
//        if ($scope.elem_num % 2 === 0) {
//            $scope.median = ($scope.sorted_list[$scope.elem_num / 2] * 1 + $scope.sorted_list[$scope.elem_num / 2 - 1] * 1) / 2;
//        } else {
//            $scope.median = $scope.sorted_list[($scope.elem_num - 1) / 2];
//        }

        // find midrange = (max + min) / 2
        var min = $scope.sorted_list[0];
        var max = $scope.sorted_list[$scope.elem_num - 1];
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
        var Q1_top = Math.floor(($scope.elem_num - 1) / 2) - 1;
        var Q3_bottom = Math.floor($scope.elem_num / 2) + 1;

        $scope.Q1 = findMedian($scope.sorted_list, 0, Q1_top);
        $scope.Q3 = findMedian($scope.sorted_list, Q3_bottom, $scope.elem_num - 1);

        // find decimal normalization
        //find j
        while (Math.pow(10, $scope.j_decimal) < Math.abs(max)) {
            $scope.j_decimal++;
        }
        //normalization
        for (var i = 0; i < $scope.elem_num; i++) {
            var vi_tmp = ($scope.sorted_list[i] / Math.pow(10, $scope.j_decimal)).toFixed(roundTo);
            $scope.vi_decimal.push(vi_tmp);
        }

        // find zscore normalization
        for (var i = 0; i < $scope.elem_num; i++) {
            var vi_tmp = (($scope.sorted_list[i] - $scope.mean) / $scope.standard_deviation).toFixed(roundTo);
            $scope.vi_zscore.push(vi_tmp);
        }

        //find minmax normalization
        for (var i = 0; i < $scope.elem_num; i++) {
            var vi_tmp = (($scope.sorted_list[i] - $scope.vi_min) * ($scope.vi_max - $scope.vi_min) / (max - min)).toFixed(roundTo);
            $scope.vi_minmax.push(vi_tmp);
        }

        // find sA
        var tmp_sum = 0;
        for (var i = 0; i < $scope.elem_num; i++) {
             tmp_sum += Math.abs($scope.sorted_list[i] - $scope.mean);
        }
        
        $scope.sA = (tmp_sum / $scope.elem_num).toFixed(roundTo);
    };
});
