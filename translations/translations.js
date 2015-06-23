angular.module('translations', ['pascalprecht.translate']);

angular.module('translations').config(function($translateProvider) {

    MessageFormat.locale["es_MX"] = function () {};

    $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
    $translateProvider.preferredLanguage('es_MX');
    $translateProvider.translations('es_MX', {
        home: 'Inicio',
        services: 'Servicios',
        about: 'Acerca de',
        success_cases: 'Casos de éxito',
        contact: 'Contacto'
    });
});
