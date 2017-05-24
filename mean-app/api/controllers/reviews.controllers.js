var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req,res){

     var hotelId = req.params.hotelId;

    console.log ("Get Hotel By Id "+hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){

            if(err){
                console.log("Hotel not found");
                res
                    .status(404)
                    .json({"message" : "The hotel ID cannot be found"});
                    return;
            }

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

            if(err){
                console.log("Hotel not found");
                res
                    .status(404)
                    .json({"message" : "The hotel ID cannot be found"});
                    return;
            }

            var review = hotel.reviews.id(reviewId);

            if(review != null){
               res
                 .status(200)
                 .json( review );

            }else{

                res
                 .status(404)
                 .json( {"message" : "The review ID cannot be found"} );

            }

        });



};

var _addReview = function(req,res, hotel){

     

    hotel.reviews.push({
        name : req.body.name ,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    hotel.save(function(err,hotelUpdated){
        
        if(err){

            res
                .status(500)
                .json(err);
        }else {

            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);

        }
    });

};

module.exports.reviewsAddOne = function(req,res){

    var hotelId = req.params.hotelId;

     Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){

            var response = {
                status : 200,
                message : []
            };

            if(err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;

            }else if(!doc){
                console.log("The hotel ID cannot be found");
                response.status = 404;
                response.message = {
                        "message" : "The hotel ID cannot be found"
                }
            }

                if(doc){
                    _addReview(req,res,doc);
                    }                     

        });

};

module.exports.reviewsUpdateGetById = function(req, res){

    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    console.log("Update reviewId "+reviewId+" for hotelId "+hotelId);   

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){

            var response = {
                status : 200,
                message : doc
            };

            var thisReview;

              if(err){
                     console.log("Error finding hotels");
                     
                     response.status = 500;
                     response.message = err;
                 
                }else if(!doc){
                    
                     response.status = 404;
                     response.message = "Hotel ID not found";
                }

                if(response.status != 200){

                     res
                 .status(response.status)
                 .json( response.message );

                }else {

                    console.log(req.body.name);
                                        
        
                 thisReview = doc.reviews.id(reviewId);

                    console.log(thisReview);

                    thisReview.name = req.body.name;
                    thisReview.review = req.body.review;
                    thisReview.rating = parseInt(req.body.rating,10);

                 doc.save(function(err, hotelUpdated){
                        if(err){
                            res
                                .status(500)
                                .json(err);
                        }else{
                            res
                                .status(204)
                                .json();
                        }
                 });          
        };

        });

};

module.exports.reviewsDelete = function(req,res){

    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    console.log("Delete reviewId "+reviewId+" for hotelId "+hotelId);   

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc){

            var response = {
                status : 204,
                message : doc
            };

            var thisReview;

             console.log(doc);

              thisReview = doc.reviews.id(reviewId);


              if(err){
                     console.log("Error finding hotels");
                     
                     response.status = 500;
                     response.message = err;
                 
                }else if(!doc){
                   
                     response.status = 404;
                     response.message = "Hotel ID not found";
                }

                if(!thisReview){
                     response.status = 404;
                     response.message = {
                         "message" : "Review ID not found " + reviewId
                     };
                 }

                    console.log(response.status);
                if(response.status != 204){

                     res
                 .status(response.status)
                 .json( response.message );

                }else {

               
                console.log(thisReview);

                thisReview.remove();

                 doc.save(function(err, hotelUpdated){
                        if(err){
                            res
                                .status(500)
                                .json(err);
                        }else{
                            res
                                .status(204)
                                .json();
                        }
                 });          
        };

        });

}