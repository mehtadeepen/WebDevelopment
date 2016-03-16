


var express = require('express');
var app = express();
var uuid = require('node-uuid');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//mongoose.connect('mongodb://localhost:27017/project');
//mongoose.connect('mongodb://admin:DgRE9-h3cXvy@127.8.193.130:27017/webdevelopment');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdevelopment';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        //"assignment";
    process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var dbase = mongoose.connection;

var colls = {};
//var db = mongoose.connection;
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

app.get("/api/check", function(req,res){
    res.json(colls);
});

//var connection1 = mongoose.createConnection('mongodb://localhost:27017/project');
//connection1.on('open',function(ref){
//    console.log('Connected to mongo server.');
//    connection1.db.listCollections().toArray(function(err, names) {
//        if (err) {
//            console.log(err);
//        }
//        else {
//            names.forEach(function(e,i,a) {
//                console.log("--->>", e.name);
//            });
//        }
//    });
//});
//var MongoClient = require('mongodb').MongoClient,
//    test = require('assert');
//
//
//mongoose.connect('mongodb://localhost:27017/afan-test');
//
//
//mongoose.connection.on('open', function (ref) {
//    console.log('Connected to mongo server.');
//    //trying to get collection names
//    mongoose.connection.db.collectionNames(function (err, names) {
//        console.log(names); // [{ name: 'dbname.myCollection' }]
//        module.exports.Collection = names;
//    });
//});
//
//// Connection url
//var url = 'mongodb://localhost:27017/afan-test';
//var db = mongoose.connect(url);
//db.on('open', function(){
//    mongoose.connection.db.collectionNames(function(error, names) {
//        if (error) {
//            throw new Error(error);
//        } else {
//            names.map(function(cname) {
//                console.log(cname.name);
//            });
//        }
//    });
//});
//// Connect using MongoClient
////MongoClient.connect(url, function(err, db) {
////    // Use the admin database for the operation
////    var adminDb = db.admin();
////    // List all the available databases
////    adminDb.listDatabases(function(err, dbs) {
////        console.log(dbs.databases);
////        test.equal(null, err);
////        test.ok(dbs.databases.length > 0);
////        db.close();
////    });
////});


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


require("./public/assignment/server/app.js")(app,uuid,db,mongoose);

app.listen(port, ipaddress);