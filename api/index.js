const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

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
  "https://class-express-dmf01o5us-ellaggons-projects.vercel.app",
  'http://127.0.0.1:5500'
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

// Los errores los debemos poner despues del routing
routerApi(app);

app.use(logErrors);
app.use(boomHandleError);
app.use(handleError);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

module.exports = app;


