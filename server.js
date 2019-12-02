const app = require('./app');
const port = process.env.PORT || 8000;
const date = new Date();

const server = app.listen(port, () => {
  console.log('Listening on port: ' + port + " | " + date);
});
