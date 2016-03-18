
var express = require('express');
var app = express();
var uuid = require('node-uuid');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var mongojs = require('mongojs');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// create a default connection string
var connectionString = 'mongodb://localhost:27017/webdevelopment';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var dbase = mongoose.connection;
var colls = {};
dbase.on('open',function(ref){
    console.log('Connected to mongo server.');
    dbase.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        }
        else {
            colls = names;
            names.forEach(function(e,i,a) {
                console.log("--->>", e.name);
            });
        }
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: "dpm"}));
app.use(cookieParser())


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/hello', function(req, res){
  res.send('hello world');
});

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

function mailMe(req, res) {

    var auth = {
      auth: {
          api_key: 'key-c677dcdd00575919169154f293704b47',
          domain: 'sandbox9efde8dec1264a6c993d2fa969836644.mailgun.org'
      }
    };

    var transporter = nodemailer.createTransport(mg(auth));

    var mailOptions = {
        from: 'Support <webdevelopment.mehtadeepen@gmail.com>',
        to: 'Support <deepenmehta27@gmail.com>',
        subject: 'The subject',
        text: 'Message in plain text', // plaintext body
        html: '<b>Hello</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });
}

app.get('/sayHello', mailMe);
app.get("/api/check", function(req,res){
    res.json(colls);
});

require("./public/assignment2/server/app.js")(app,uuid,db,mongoose);

app.listen(port, ipaddress);