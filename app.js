const path = require('path');

const express = require('express');

const app = express();

const uuid = require('uuid')


//require your OWN file (the restaurant-data.js file that contains the functions)
//for reading and writing data
const resData = require('./util/restaurant-data');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const storedRestaurants = resData.getStoredRestaurants();


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/restaurants', function (req, res) {

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});



app.post('/recommend', function (req, res) {
  const restaurant = req.body;

  //restaurant is an object with user inputted data.
  //restaurant object does not have an id field, you can add to the object
  //by setting a unique id with the help of uuid package.
  //v4() is a method provided by package that generates unique id
  restaurant.id = uuid.v4();
  storedRestaurants.push(restaurant);

resData.storeRestaurants(storedRestaurants);

  res.redirect('/confirm');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/about', function (req, res) {
  res.render('about');
});


//DYNAMIC RESTAURANT DETAILS ROUTE
app.get('/restaurants/:id', function (req, res) {
  //params contains an object that holds any dynamic url stuff
  const restaurantId = req.params.id;

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-detail', {
        rid: restaurantId,
        restaurant: restaurant
      })

    }
  }

  res.render('404')


})


//catches any routes/urls that was not handled yet.
app.use(function(req, res) {
res.status(404).render('404');
});


//must pass 4 parameters to the function because it tells
//Express that this is a error handling middleware
app.use(function(error, req, res, next) {
res.status(500).render('500')

})


app.listen(4000);
