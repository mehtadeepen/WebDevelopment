
var express = require('express');
var app = express();
var uuid = require('node-uuid');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
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

    var form = req.body;
    console.log(form);
    var auth = {
        auth: {
            api_key: 'key-c677dcdd00575919169154f293704b47',
            domain: 'sandbox9efde8dec1264a6c993d2fa969836644.mailgun.org'
        }
    };

    var transporter = nodemailer.createTransport(mg(auth));

    var mailOptions = {
        from: 'Deepen <webdevelopment.mehtadeepen@gmail.com>',
        to: form.name+'<'+form.email+'>',
        subject: 'Thank you for your message',
        text: 'Message in plain text', // plaintext body
        html: '<p>Please find your message below</p><br/><br/><b><i>'+form.message+'</i></b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ', info);
            //res.json({yo: info.response});
            res.redirect(req.header('Referer')+'#three');
        }
    });
}

app.post('/api/sayHello', mailMe);


var userModelAssignment = require("./public/assignment/server/models/user.model.server")(db,mongoose);
var userModelProject = require("./public/project/server/models/user.model.server")(db,mongoose);

var securityService = require("./public/security/security.js")(userModelAssignment,userModelProject);
require("./public/assignment/server/app.js")(app,uuid,db,mongoose,userModelAssignment,securityService);
require("./public/project/server/app.js")(app,db,mongoose,mongojs,userModelProject, securityService);

app.listen(port, ipaddress);

