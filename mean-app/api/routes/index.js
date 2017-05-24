var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');


//Hotel routes
router
 .route('/hotels')
 .get(ctrlHotels.hotelsGetAll)
 .post(ctrlHotels.hotelsAddOne);

 router
 .route('/hotels/:hotelId')
 .get(ctrlHotels.hotelsGetById)
 .put(ctrlHotels.hotelsUpdateGetById)
 .delete(ctrlHotels.hotelsDelete);

//Review Routes
router
 .route('/hotels/:hotelId/reviews')
 .get(ctrlReviews.reviewsGetAll)
 .post(ctrlReviews.reviewsAddOne);

 router
 .route('/hotels/:hotelId/reviews/:reviewId')
 .get(ctrlReviews.reviewsGetById)
 .put(ctrlReviews.reviewsUpdateGetById)
 .delete(ctrlReviews.reviewsDelete);

module.exports = router;