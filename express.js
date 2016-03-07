//Import Express Framework. Install: npm install express
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);
// Maybe needed
//    io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

/* methodOverride: works with bodyParser and provides DELETE and PUT methods along with POST. 
You can use app.put() and app.delete() rather than detecting the user’s intention from app.post(). 
This enables proper RESTful application design. 
However the form/request will require a hidden input _method that can be put or delete*/
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

/* Database */
var mongoose = require('mongoose'); //Import MongoDb 'driver'.Install: npm install mongoose
mongoose.connect('mongodb://localhost/numbers');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* Models */
var User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', User);

/* RESTful API */

//Get All
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname
    });
});


server.listen(9000);
console.log("Server running at localhost:9000");