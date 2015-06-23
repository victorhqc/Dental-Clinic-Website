angular.module('DentalClinic').directive('menu', function($location, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: 'directive/menu/menu.html',
        link: function(scope, element, attrs, fn) {

            /**
             * The menu is dinamically created, although is not yet perfect, the numbers are calculated here.
             * @return {[json]} Object containing the result of the calculation
             */
            function calculateNumbers(max, total) {
                //The menu is not optimal, it works but further work will be required when more modules come by.
                var num = Math.floor(max / total); // <----- If there are 4 items it will be 12 / 4 = 3 so it will be col-sm-3
                num = (num < 1) ? 1: num;

                //In case that num is lower than 12, then an offset will be added.
                var offset = (num < 12) ? (max - (total * num)) / 2 : 0;

                return {num: num, offset: offset};
            }

            /**
             * When the mouse enters in a category, it will move, to do this, it will change the classes of the menu
             * A calculation is needed to acomplish that.
             */
            function calculateNewNumber()
            {
                //The active category will be 1/4 of the total menu (aprox.)
                var maxActive = Math.floor(scope.max / 3);
                scope.maxActive = maxActive;
                var newNum = calculateNumbers(scope.max - maxActive, scope.categories.length - 1);

                scope.newNum = newNum.num;
            }

            /**
             * Change the menu classes
             */
            scope.newNumbers = function(num, elm) {
                var previous = document.querySelectorAll('#top-menu li');
                for(var i = 0, len = previous.length; i < len; i++){
                    var p = previous[i];

                    var classn = 'col-sm-'+num;
                    if(p.getAttribute('data-first') !== null){
                        classn += ' col-sm-offset-'+scope.numbers.offset;
                    }
                    p.className = classn;
                    if(p.getAttribute('data-active') !== null){
                        p.removeAttribute('data-active');
                    }
                }
            };

            scope.adjustCategory = function(category, ev, e)
            {
                var el = (ev !== null) ? ev.target : e;
                //First clean the previous selected category (when necessary)
                var calculatedNum = scope.newNum;
                scope.newNumbers(calculatedNum);

                el.setAttribute('data-active', '');
                el.className = 'col-sm-'+scope.maxActive;
            };

            scope.collapseMenu = function(e)
            {
                routeChange();
            };

            scope.loadCategory = function(category, ev) {
                console.log('to-load', category);
            };

            function routeChange()
            {
                scope.route = $location.path();
                scope.route = scope.route.split('/')[1];

                var btn = document.querySelector('#top-menu *[data-module="'+scope.route+'"]');
                scope.adjustCategory(scope.route, null, btn);
            }

            scope.$on('$locationChangeSuccess', function(next, current) {
                routeChange();
            });

            scope.max = 12;
            scope.categories = [
                {name: 'home'},
                {name: 'services'},
                {name: 'about'},
                {name: 'success_cases'},
                {name: 'contact'}
            ];

            scope.numbers = calculateNumbers(scope.max, scope.categories.length);
            calculateNewNumber();
            $timeout(function(){
                routeChange();
            }, 0);
        }
    };
});
