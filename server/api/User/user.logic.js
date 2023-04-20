//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
const db = require("../../models");
const Logic = require("../Logic.js");
const User = db.user;

class UserLogic extends Logic {
  constructor() {
    super(User);
    super.model = User
  }

  getAllData = async () => {
    try {
      return new Promise((resolve, reject) => {
        this.model.findAll({
          include: [
            { model: db.council },
            { model: db.userRol },
            { model: db.business }
          ]
        }).then((users) => resolve(users))
          .catch((error) => { reject(error) })
      })
    }
    catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  getAllDataFromSpecific = async (id) => {
    try {
      return new Promise((resolve, reject) => {
        this.model.findByPk(id).then(async (r) => {
          console.log(r)
          await this.model.findAll({
            where: {
              id: id
            },
            include: [{
              model: db.council,
              // required: true,
            }]
          }).then((user) => resolve(user))
            .catch((error) => { reject(error) })
        })
          .catch((error) => { reject(error) })
      })
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
module.exports = UserLogic;
