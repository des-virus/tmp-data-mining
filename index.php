<!DOCTYPE html>
<html ng-app="app">
    <head>
        <meta charset="UTF-8">
        <title>Khai phá dữ liệu</title>

        <link href="css/lib/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>

        <script src="js/lib/angular.min.js" type="text/javascript"></script>
        <script src="js/lib/jquery-3.1.1.min.js" type="text/javascript"></script>
        <script src="js/lib/bootstrap.min.js" type="text/javascript"></script>

        <script src="js/module/app.js" type="text/javascript"></script>
        <script src="js/service/RoomService.js" type="text/javascript"></script>
        <script src="js/controller/RoomController.js" type="text/javascript"></script>

        <script>
            $(document).ready(function () {
                $("li a[href='" + window.location.pathname.split('/')[2] + "']").parent().addClass('active');
            });
        </script>

    </head>
    <body ng-controller="RoomCtrl">
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.php">Minh Phong 306</a>
                </div>
                <ul class="nav navbar-nav">
                    <li ><a href="index.php">Trang chủ</a></li>

                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span> Đăng nhập</a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Đăng xuất</a></li>
                </ul>
            </div>
        </nav>


        <div class="container">
            <form class="form-horizontal">
                <h3 class="text-center text-danger">{{errorStr}}</h3>
                <div class="form-group">
                    <label class="control-label col-sm-2" for="data">Dữ liệu</label>
                    <div class="col-sm-10">
                        <input ng-model="input_data" type="text" class="form-control" id="data" placeholder="Nhập dữ liệu, cách nhau dấu ;">
                    </div>
                </div>

                <div class="form-group"> 
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-primary" ng-click="caculateStandardDeviation()">Tính toán</button>
                    </div>
                </div>
            </form>

            <fieldset class="scheduler-border">
                <legend class="scheduler-border">Kết quả tính toán</legend>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="sorted_list">Dãy sắp xếp tăng dần</label>
                            <div class="col-sm-10">
                                <label class="form-control" id="sorted_list">{{sorted_list.join(', ')}}</label>
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </div>
                   
                    <div class="col-md-6">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="elem_num">Số phần tử</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{elem_num}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="sum">Tổng</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{sum}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="mean">TB cộng (mean)</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{mean}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="standard_deviation">Phương sai (σ)</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{standard_deviation}}</label>
                                </div>
                            </div>
                        </div>





                    </div>
                    
                    <div class="col-md-6">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="elem_num">Trung vị (median)</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{median}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="mode">Mode</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="mode">{{mode}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="mean">Midrange (max+min)/2</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{midrange}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="standard_deviation">Q1-Q2-Q3</label>
                                <div class="col-sm-10">
                                    <label class="form-control" id="sum">{{standard_deviation}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </fieldset>

        </div>

    </body>
</html>