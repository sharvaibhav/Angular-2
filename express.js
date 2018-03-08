const express = require('express')
const app = express();
var querystring = require('querystring');
var OauthParams = require('./OauthParams');
var http = require('https');
var request = require('superagent');

app.listen(3000,()=>{console.log("listening on 3000 port")});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/',(req,res)=>{
  res.send('Hello World')
})

app.get('/auth', function (req, res) {
    console.log("auth route - Request object received from Linkedin", req.query);

    //TODO: validate state here
    var error = req.query.error;
    var error_description = req.query.error_description;
    var state = req.query.state;
    var code = req.query.code;
    if (error) {
        next(new Error(error));
    }
    handshake(req.query.code, res);
})

function handshake(code, ores) {

    var data = querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: OauthParams.redirect_uri,//should match as in Linkedin application setup
        client_id: OauthParams.client_id,
        client_secret: OauthParams.client_secret// the secret
    });

    // var options = {
    //     host: 'www.linkedin.com',
    //     path: '/oauth/v2/accessToken',
    //     protocol: 'https:',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // };
    // console.log(options);
    // var req = http.request(options, function (res) {
    //      let data = '';
    //     res.setEncoding('utf8');
    //     res.on('data', function (chunk) {
    //         data += chunk;

    //     });
    //     res.on('end', function () {
    //         //once the access token is received store in DB
    //         console.log(JSON.parse(data));
    //     });
    //     req.on('error', function (e) {
    //         console.log("problem with request: " + e.message);
    //     });

    // });

    // req.write(data);
    // req.end();

    request
    .post('https://www.linkedin.com/oauth/v2/accessToken')
    .send(data)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .accept('application/json')
    .end(function(err, resp){
      console.log("resp............", resp);
      const accessToken = resp.body.access_token;
      console.log("accessToken---->", accessToken);
      res.send(accessToken);
  });

//   var options = {
//     hostname: 'www.google.com',
//     agent: false
//   };
  
//   var makeRequest = function() {
//     var req;
  
//     req = http.get(options, function(res) {
//         count++;
//         console.log('STATUS: ' + res.statusCode);
//         console.log('Request count = ' + count);
//     });
  
//     req.on('error', function(e) {
//         console.log('problem with request: ' + e.message);
//         console.log('Last successful request count = ' + count);
//     });
//   };
  
//   setInterval(makeRequest, 5000);


    
}
