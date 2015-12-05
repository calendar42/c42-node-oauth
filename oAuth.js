var http = require('http');
var qs = require('querystring');
var OAuth = require('oauth'), OAuth2 = OAuth.OAuth2;

var clientID = '';
var clientSecret = '';
var serviceGUID = '';

var host = 'https://demo.calendar42.com/';
var authorizePath = 'oauth2/authorize/';
var tokenPath = 'oauth2/token/';

var calendarsPath = 'api/v2/calendars/';

var oauth2 = new OAuth2(clientID,
                        clientSecret,
                        host,
                        authorizePath,
                        tokenPath,
                        null); /** Custom headers */

http.createServer(function (req, res) {
    var p = req.url.split('/');
    pLen = p.length;
    /**
     * Authorised url as per github docs:
     * https://developer.github.com/v3/oauth/#redirect-users-to-request-github-access
     *
     * getAuthorizedUrl: https://github.com/ciaranj/node-oauth/blob/master/lib/oauth2.js#L148
     * Adding params to authorize url with fields as mentioned in github docs
     *
     */
    var authURL = oauth2.getAuthorizeUrl({
        // redirect_uri: 'http://localhost:8080/code',
        scope: ['service.read'],
        state: 'random_state_string',
        response_type: 'code'
    });

    var access_token;

    /**
     * Creating an anchor with authURL as href and sending as response
     */
    var body = '<a href="' + authURL + '"> Get C42 Code </a>';
    if (pLen === 2 && p[1] === '') {
        console.log("link page requested")
        res.writeHead(200, {
            'Content-Length': body.length,
            'Content-Type': 'text/html' });
        res.end(body);
    } else if (pLen === 3 && p[1].indexOf('code') === 0) {
        // Calendar42 sends the oAuth Code in the url
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var code = query.code;

        /** Obtaining access_token */
        oauth2.getOAuthAccessToken(
            code,
            {
              'grant_type':'authorization_code',
              'redirect_uri': 'http://localhost:8080/code/',
              'service': serviceGUID
            },
            function (e, resp_access_token, refresh_token, results){
                if (e) {
                    // Error 1
                    console.log(e);
                    res.end(e);
                } else if (results.error) {
                    // Error 2
                    console.log(results);
                    res.end(JSON.stringify(results));
                }else {
                    // Success
                    access_token = resp_access_token;
                    console.log('Obtained access_token: ', access_token);
                    getCalendars();
                }
        });

        // example method about how to use the accessToken once it is get
        var getCalendars = function(){

          oauth2.useAuthorizationHeaderforGET(true);

          oauth2.get(host + calendarsPath, access_token, function(response){
            var body = "";
            var data = JSON.parse(response.data);
            if(response.statusCode !== 200){
              // error
              body = "<p><b>StatusCode</b> = "+response.statusCode+"</p>" +
                "<p><b>Message</b> = "+data.error.message+"</p>";
            }else{
              var renderData = JSON.stringify(data.data);
              body = '<p><b>StatusCode</b> = '+response.statusCode+'</p><p>Found = '+data.meta_data.count+' calendars</p><p><b>Calendars list</b> : '+renderData+'</p>';
            }
            res.writeHead(200, {
                'Content-Length': body.length,
                'Content-Type': 'text/html' });
            res.end(body);
          });
        }
    } else {
      body = "Not Found";
      res.writeHead(404, {
          'Content-Length': body.length,
          'Content-Type': 'text/html' });
      res.end(body);
    }
}).listen(8080);
