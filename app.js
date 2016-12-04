var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var compression = require('compression');

var roomRoute = require('./routes/roomRoute');
var ssRoute = require('./routes/ssRoute');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow cross domain
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Cache-Control');
    next();
});

console.log(__dirname);

app.use(express.static(path.join(__dirname, './SPA')));
app.use(express.static(path.join(__dirname, './node_modules')));

app.use('/api/rooms/', roomRoute);
app.use('/api/ss/', ssRoute);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({ "error": err.message });
});

app.listen(app.get('port'), function () {
    console.log('port: ' + 5000);
});
