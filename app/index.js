var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js');

var sentryKey = 'b498ae72fd024986af168ce625f75985',
  sentryApp = '107293',
  sentryUrl = 'https://' + sentryKey + '@app.getsentry.com/' + sentryApp;

var APP_INFO = {
  name: 'Github Battle',
  branch: 'video4',
  version: '1.0'
};

Raven.config(sentryUrl, {
  release: APP_INFO.version,
  tags: {
    branch: APP_INFO.branch
  }
}).install();


ReactDOM.render(routes, document.getElementById('app'));
