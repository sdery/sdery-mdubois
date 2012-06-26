/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , routes = require('./routes')


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', routes.index);
app.get('/login',  routes.login);
app.get('/signup', routes.signup);

console.log('Running on port 2332');
app.listen(2332, '0.0.0.0')