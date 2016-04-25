angular.module('quinielasServices', [])
        .factory('factoryQuinielasService', function ($http) {
            return {
                detalle: function (id) {
                    return $http({
                        method: 'GET',
                        url: QUINIELA + 'quinielas/detallequiniela?id=' + id
                    });
                },
                listaQuinielas: function (token) {
                    return $http({
                        method: 'GET',
                        url: QUINIELA + 'quinielas/quinielausuario?valida=' + token
                    });
                }
            };
        })
        .factory('translationService', function ($resource) {
            return{
                getTranslation: function ($scope, language) {
                    var languageFilePath = 'translations/translation_' + language + '.json';
                    $resource(languageFilePath).get(function (data) {
                        $scope.translation = data;
                    });
                }};
        });
