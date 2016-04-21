angular.module('quiniela.agregar', ['ngRoute', 'ngResource', 'ngCookies', 'agregarServices'])
        .controller('AgregarCtrl', function ($scope, $window, $location, factoryAgregarService, translationService, $cookies) {
            if (!$cookies.get('csrftoken')) {
                $window.location.href = 'index.html';
            }

            $scope.mensajeError = null;
            $scope.muestraMensajeError = false;

            $scope.process = $(
                    '<div class="modal fade" id="process" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static"  data-keyboard="false" >'


                    + '<div class="modal-dialog" >'
                    + '<div class="modal-content">'
                    + '<div class="modal-header">'
                    + '<h4 class="modal-title" id="myModalLabel">Procesando</h4>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + 'Verificando Credenciales'
                    + '<div class="progress">'
                    + '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'
                    + '<span class="sr-only">10% Complete</span>'
                    + '</div>'
                    + '</div>'

                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '</div>');

            $scope.consultarDatos = function () {
                $scope.objetosList = [];
                $scope.process.modal('show');
                $scope.consultando = true;
                $scope.mensajeError = null;
                $scope.muestraMensajeError = false;
                factoryAgregarService.partidos($cookies.get('csrftoken'))
                        .success(function (data) {
                            $scope.process.modal('hide');
                            $scope.objetosList = data;
                            console.log($scope.objetosList);
                        }).error(function (data) {
                    $scope.process.modal('hide');
                    $scope.consultando = false;
                    if (data) {
                        $scope.muestraMensajeError = data.error;
                        $scope.mensajeError = data.des_error;
                    } else {
                        $scope.muestraMensajeError = true;
                        $scope.mensajeError = "Error Consultando BackEnd";
                    }
                });
            };
            $scope.consultarDatos();

            $scope.translate = function () {
                translationService.getTranslation($scope, $scope.selectedLanguage);
            };
            $scope.selectedLanguage = IDIOMA;
            $scope.translate();

        });