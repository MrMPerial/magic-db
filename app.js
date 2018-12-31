const express = require('express');
 
const app = express();
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
 
app.get('/', (req, res) => {
  res.render('main');
});
 
// app.use('/endpoint', file);
 
module.exports = app;
