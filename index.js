var express = require('express');
var app = express();
var dbOptions = {
	db: { native_parser: true },
	server: { poolSize: 5 },
	replset: { rs_name: 'myReplicaSetName' },
	user: 'sandi',
	pass: 'zxcvbnm!@'
}
var mongoose = require('mongoose');
var Photo ;
db_connect();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api/getphoto', function(request, response) {
	
	Photo.find(function (err, photo_list) {
		if (err){
			response.end('fetch error');
			return console.error(err);
		}
		console.log(photo_list);
		response.end('fetch success');
	});

});

app.get('/api/savephoto', function(request, response) {

	var new_photo = new Photo({
		"previewHeight":99,
        "likes":46,
        "favorites":38,
        "tags":"flower, yellow, spring",
        "webformatHeight":425,
        "views":11255,
        "webformatWidth":640,
        "previewWidth":150,
        "comments":9,
        "downloads":3547,
        "pageURL":"https://pixabay.com/en/flower-yellow-spring-sun-108685/",
        "previewURL":"https://pixabay.com/static/uploads/photo/2013/05/03/13/14/flower-108685_150.jpg",
        "webformatURL":"https://pixabay.com/get/e835b90920f11c2ad65a5854e44f4f92e77febc818b5174192f2c37fa0ed_640.jpg",
        "imageWidth":3812,
        "user_id":27062,
        "user":"GREGOR",
        "type":"photo",
        "id":108685,
        "userImageURL":"https://pixabay.com/static/uploads/user/2013/08/15/14-01-39-728_250x250.jpg",
        "imageHeight":2537
	});
	// console.log(new_photo);
	new_photo.save(function (err, data) {
		if (err){
			response.end('save error');
			return console.error(err);
		}
		console.error(data);
		response.end('save success');
	});

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function db_connect(){
	mongoose.connect('mongodb://ds023480.mlab.com:23480/gallery', dbOptions);
	// mongoose.connect('mongodb://sandi:zxcvbnm!@@ds023480.mlab.com:23480/gallery');
	var db = mongoose.connection;
	// console.log(db);
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		// we're connected!
	});
	var photoSchema = mongoose.Schema({
        "previewHeight":Number,
        "likes":Number,
        "favorites":Number,
        "tags":String,
        "webformatHeight":Number,
        "views":Number,
        "webformatWidth":Number,
        "previewWidth":Number,
        "comments":Number,
        "downloads":Number,
        "pageURL":String ,
        "previewURL":String,
        "webformatURL":String,
        "imageWidth":Number,
        "user_id":Number,
        "user":String,
        "type":String,
        "id":Number,
        "userImageURL":String,
        "imageHeight":Number
	});
	Photo = mongoose.model('photos', photoSchema);
}

