const App = require('./App');
const db = require("./models");
const initialize = require('./initialize.config');

const app = new App();
app.start();

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initialize();
});
