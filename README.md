# c42-node-oauth
Node JS oAuth consumer for the C42 REST API

This is an example project about how to consume the Calendar42 oAuth.

It is using nodeJs technologies and the API [node-oauth](https://github.com/ciaranj/node-oauth)

# Installation

Clone this project

```
git clone https://github.com/calendar42/c42-node-oauth.git
```

Install node-oauth

```
npm install
```

Add your clientID, clientSecret and serviceID

```javascript
...
var clientID = '';
var clientSecret = '';
var serviceGUID = '';
...
```

# Usage

Run your project

```
node oAuth.js
```

Visit the page with your browser. The server is listening in the port 8080.

```
localhost:8080
```

Clicking the link you will start the oAuth process.
The last page should show the Calendars list of the user used to login.
