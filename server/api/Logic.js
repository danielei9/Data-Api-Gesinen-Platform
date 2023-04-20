//********************************************* */
//******************** LOGIC  ******************* */
// Author: Daniel Burruchaga Sola 
// Gesinen S.L 
// 02/01/23
//
// Clase Abstraida Logica
//********************************************* */

class Logic {
  constructor(model) {
    this.model = model;
    // console.log(model)
  }

  async findAll() {
    try {
      return new Promise((resolve, reject) => {
        this.model.findAll().then((r) => resolve(r))
          .catch((error) => { reject(error) })
      })
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

 async findByPk(id) {
    try {
      return new Promise((resolve, reject) => {
        this.model.findByPk(id).then((r) => resolve(r))
          .catch((error) => { reject(error) })
      })
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async create(dataToCreate) {
    console.log("Create Logic")
    try {
      return new Promise((resolve, reject) => {
        this.model.create(dataToCreate).then((r) => resolve(r))
          .catch((error) => { reject(error) })
      })
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);

    }
  }

  async update(id, dataToUpdate) {
    let selector = {
      where: { id: id }
    };
    try {
      return new Promise(async (resolve, reject) =>  {
        await this.model.update(dataToUpdate,selector).then( (r) => {
            resolve(r)
        })
          .catch((error) => { reject(error) })
      })
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async destroy(idSelector) {
    try {
      return new Promise((resolve, reject) => {
        this.model.destroy(idSelector).then((r) => resolve(r))
          .catch((error) => { reject(error) })
      })
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
module.exports = Logic;
