# c42-node-oauth
Node JS oAuth consumer for the C42 REST API

This is an example project about how to consume the [Calendar42 oAuth](http://docs.calendar42.com/en/latest/rest-api/oAuth-authorization/).

It is using nodeJS and the API [node-oauth](https://github.com/ciaranj/node-oauth)

# Installation

Clone this project

```
git clone https://github.com/calendar42/c42-node-oauth.git
```

Install node-oauth

```
npm install
```

In file `client-config.js` file is where you should introduce your client credentials.

```javascript
exports.clientConfig = {
  host: 'https://demo.calendar42.com/',
  clientID : '',
  clientSecret : '',
  serviceID : '',
  sandboxEmail : ''
}
```

> Don't you have an access token yet? Please visit our [documentation](http://docs.calendar42.com/en/latest/rest-api/api-tokens/) and [contact us](<mailto:support@calendar42.com>).

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

For more information please check the [Calendar42 documentation](http://docs.calendar42.com/en/latest/rest-api/authentication/).

## Silent flow

The Calendar42 oAuth system allow for a `silent process`.

To enable the silent flow it is required to set the `sandboxEmail` with a valid email.

For more information about this process please check the [C42 silent oAuth flow documentation](http://docs.calendar42.com/en/latest/rest-api/authentication/#silent-oauth).

## Valid endpoints

All the information about the C42 API can be found [here](https://calendar42.com/api/docs/)
