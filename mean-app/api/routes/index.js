var express = require('express');
var route = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

route
 .route('/hotels')
 .get(ctrlHotels.hotelsGetAll);

 route
 .route('/hotels/:hotelId')
 .get(ctrlHotels.hotelsGetById);

 route
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);

module.exports = route;