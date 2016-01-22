


var express = require('express');
var app = express();
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

// var nodemailer = require('nodemailer');

// function handleSayHello(req, res) {
//     // Not the movie transporter!
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'webdevelopment.mehtadeepen@gmail.com', // Your email id
//             pass: 'webdevelopment' // Your password
//         }
//     });
//      var textbody = req.body;

//     var mailOptions = {
//     from: 'webdevelopment.mehtadeepen@gmail.com', // sender address
//     to: 'mr.san.kumar@gmail.com', // list of receivers
//     subject: 'Email Example', // Subject line
//     //text: textbody
//     html: '<b>Hello world 🐴</b>' //, // plaintext body

   
//     // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
// };


// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//         res.json({yo: 'error'});
//     }else{
//         console.log('Message sent: ' + info.response);
//         res.json({yo: info.response});
//     };
// });

// }


 app.get('/sayHello', mailMe);
//router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

//var text = 'Hello world from \n\n' + req.body.name;




app.listen(port, ipaddress);