const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('pino-http')()
const errorHandler = require('./api/middlewares/error.handler')

const db = require("./models");

class App {
  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.routes();
  }

  config() {
    this.app.set('port', process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(errorHandler);
    this.app.use(logger)
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    require('./api/User/user.routes')(this.app);
  }

  start() {
    this.app.listen(this.app.get('port'), (port) => {
      console.log('Server on port ${this.app.get(', port, ')}');
    });
  }
}


module.exports = App