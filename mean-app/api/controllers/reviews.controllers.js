var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req,res){

     var hotelId = req.params.hotelId;

    console.log ("Get Hotel By Id "+hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){

               res
                 .status(200)
                 .json( doc.reviews );

        });

};

module.exports.reviewsGetById = function(req,res){

    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    console.log("Get ReviewId "+ reviewId + "for HotelId "+ hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel){
            var review = hotel.reviews.id(reviewId);
               res
                 .status(200)
                 .json( review );

        });



};