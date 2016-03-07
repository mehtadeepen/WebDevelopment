


var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

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

app.listen(port, ipaddress);