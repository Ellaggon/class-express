const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
  logErrors,
  handleError,
  boomHandleError,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = [
  'http://localhost:3000',
  'http://localhost:8080',
  'algo.com',
  'http://127.0.0.1:5500',
];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true); //null es no hay ningun error, acceso permitido
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hello its a new route??');
});

// Los errores los debemos poner despues del routing
routerApi(app);

app.use(logErrors);
app.use(boomHandleError);
app.use(handleError);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

module.exports = app;
