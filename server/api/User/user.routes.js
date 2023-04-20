const { authJwt } = require("../middlewares");
const UserController = require("./user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const userController = new UserController();

  app.get("/api/v1_1/test/all", userController.allAccess);


  app.get("/api/v1_1/user/:id", userController.findByPk);
  app.get("/api/v1_1/user", userController.getAllData);// verify is admin
  app.post("/api/v1_1/user", userController.create);
  app.put("/api/v1_1/user/:id",[authJwt.verifyToken], userController.update);
  app.delete("/api/v1_1/user/:id",[authJwt.verifyToken], userController.destroy);
  app.get("/api/v1_1/user/all/:id", userController.getAllDataFromSpecific);
  

  /** 
   * Para la authentificación:
   *  - Hacer SignUp y tener un Usuario User/Mod/Admin
   *  - Hacer SignIn y obtener 
   *      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTk4NTA4LCJleHAiOjE2NDcyODQ5MDh9.WL7eHXH8XJac56dYUfThXN-mWbauoYCYuy8qDTH-yLo"
   *  - Desde el cliente es necesari estipular un header :
   *      KEY: x-access-token, VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTk4NTA4LCJleHAiOjE2NDcyODQ5MDh9.WL7eHXH8XJac56dYUfThXN-mWbauoYCYuy8qDTH-yLo
   *  - Añadir en cada ruta que sea necesaria el middleware como se muestra a continuación
   */
  
  // PARA USERS QUE PUEDAN EDITAR Y TAL SU INFO
  app.get(
    "/api/v1_1/test/user",
    [authJwt.verifyToken],
    userController.userBoard
  );
  // PARA MODS QUE PUEDAN EDITAR Y TAL SU INFO Y MAS
  app.get(
    "/api/v1_1/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );
  // PARA ADMINS QUE PUEDAN EDITAR TODO
  app.get(
    "/api/v1_1/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};
