angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($routeParams, hotelDataFactory){

    

    var vm = this;
    var id = $routeParams.id;

    hotelDataFactory.hotelDisplay(id).then(function(response){

        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
        console.log(vm.stars);
    });

    function _getStarRating(stars){
       // console.log(stars);
        return new Array(stars);
    }
}