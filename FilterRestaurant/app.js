var express = require('express');
var app = express();
var request = require('request');
app.use(express.static('public'));

app.get('/restaurants/:selectedCuisine', function (req, res) {

  var selectedCuisine = req.params.selectedCuisine;
  var selectedSortBy = req.query.sort_by;
  var selectedPrice = req.query.price;

  var options = {
    url:
      'https://api.yelp.com/v3/businesses/search?term=restaurants&categories=' + selectedCuisine + '&locale=en_CA&location=vancouver,bc,canada&sort_by=' + selectedSortBy + '&price=' + selectedPrice,
    headers: {
      'Authorization': 'Bearer qrgftoKn3uV2nvdTUOYxxeSkJMpmow-5vluyn8p6zfAfwkt--AUccv_kGmm08_D8gKUcSJtxBzZa1wGydzliHsc2qNWFopLPU5XHTw1qF9ZV1_DJUzLdx5Ps_oBvW3Yx'
    }
  };

  request(options, function (err, resp, data) {
    var name = [];
    var businessId = [];
    var url = [];
    var review_count = [];
    var rating = [];
    var price = [];
    var location = [];
    var response = [];

    if (err) {
      return console.log(err);
    } else {
      var body = JSON.parse(data);
      for (var i = 0, j = 0; i < body.businesses.length && j < 10; i++ , j++){
        name[i] = body.businesses[i].name;
        businessId[i] = body.businesses[i].id;
        url[i] = body.businesses[i].url;
        review_count[i] = body.businesses[i].review_count;
        rating[i] = body.businesses[i].rating;
        price[i] = body.businesses[i].price;
        location[i] = body.businesses[i].location.address1 + ", " + body.businesses[i].location.city;

        response[i] = {
          "name": name[i],
          "businessId": businessId[i],
          "url": url[i],
          "review_count": review_count[i],
          "rating": rating[i],
          "price": price[i],
          "location": location[i]
        };
      }

      res.send(response);
    }
  });
});

app.get('/reviews/:id', function (req, res) {
  var reviews = [];
  var response = [];
  var selectedId = req.params.id;
  var options = {
    url:
      'https://api.yelp.com/v3/businesses/' + selectedId + '/reviews',
    headers: {
      'Authorization': 'Bearer qrgftoKn3uV2nvdTUOYxxeSkJMpmow-5vluyn8p6zfAfwkt--AUccv_kGmm08_D8gKUcSJtxBzZa1wGydzliHsc2qNWFopLPU5XHTw1qF9ZV1_DJUzLdx5Ps_oBvW3Yx'
    }
  };

  request(options, function (err, resp, data) {
    if (err) {
      return console.log(err);
    } else {
      var body = JSON.parse(data);
      for (var i = 0; i < 3; i++) {
        reviews[i] = body.reviews[i].text;
        response[i] = {
          "review": reviews[i]
        };
      }
      res.send(response);
    }
  });
});

app.listen(3000);
console.log('Server running at 3000/');
