angular.module('home').controller('ContactCtrl',function($scope){
    /**
     * Fixes the width of the map to 100% of its parent
     */
    function fixWidth(reload) {

        var map = document.getElementById('map');
        $(map).css('display', 'none'); // Hides the iframe to prevent misscalculations
        var width = map.parentNode.offsetWidth - 30;
        map.width = width;

        //Reloads the iframe
        if(reload === true){
            var src = map.src;
            map.src = '';
            map.src = src;
        }

        $(map).css('display', 'block');
    }

    window.onresize = function(event){
        fixWidth(true);
    };

});
