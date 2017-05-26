var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');


//Hotel routes
router
 .route('/hotels')
 .get(ctrlHotels.hotelsGetAll)
 .post(ctrlUsers.authenticate,ctrlHotels.hotelsAddOne);

 router
 .route('/hotels/:hotelId')
 .get(ctrlHotels.hotelsGetById)
 .put(ctrlUsers.authenticate,ctrlHotels.hotelsUpdateGetById)
 .delete(ctrlUsers.authenticate,ctrlHotels.hotelsDelete);

//Review Routes
router
 .route('/hotels/:hotelId/reviews')
 .get(ctrlReviews.reviewsGetAll)
 .post(ctrlUsers.authenticate,ctrlReviews.reviewsAddOne);

 router
 .route('/hotels/:hotelId/reviews/:reviewId')
 .get(ctrlReviews.reviewsGetById)
 .put(ctrlUsers.authenticate,ctrlReviews.reviewsUpdateGetById)
 .delete(ctrlUsers.authenticate,ctrlReviews.reviewsDelete);

//Auth

router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;