module.exports = {
  "development": {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "ER28-0652",
    PORT: 3000,
    DB: "gesinen",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "test": {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "ER28-0652",
    PORT: 3000,
    DB: "gesinen",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "docker": {
    HOST: process.env.POSTGRES_HOST,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    PORT: 3000,
    DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
      //   }
    },
  }
};
//  //DOCKER
// module.exports = {
//   HOST: process.env.POSTGRES_HOST,
//   USER: process.env.POSTGRES_USER,
//   PASSWORD: process.env.POSTGRES_PASSWORD,
//   DB: process.env.POSTGRES_DB,
//   PORT: process.env.POSTGRES_PORT,
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };