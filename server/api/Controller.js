//********************************************* */
//******************** Controller  ******************* */
//********************************************* */
const Logic = require("./Logic");
const db = require("../models");
const Business = db.business;

class Controller {
  constructor(model) {
    this.model = model;
    this.logic = new Logic(this.model)
  }

  // Función a sobreescribir 
  getDataFromRequest(req) {
    const dataRequest = {}
    return dataRequest
  }

  findAll = async (req, res) => {
    console.log("findAll")
    await this.logic.findAll()
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        } else {
          res.status(404).json({ message: "Object could not be found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }

  findByPk = async (req, res) => {
    await this.logic.findByPk(req.params.id)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        } else {
          res.status(404).json({ message: "Object could not be found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }

  create = async (req, res) => {
    const dataRequest = this.getDataFromRequest(req)
    await this.logic.create(dataRequest)
      .then((r) => {
        console.log("Controller");
        console.log(r);
        if (r) {
          res.status(201).json(r);
        } else {
          res.status(404).json({ message: "Object could not be created" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }
  // TODO: Revisar update
  update = async (req, res) => {
    const dataRequest = this.getDataFromRequest(req)
    const id = req.params.id

    await this.logic.update(id, dataRequest)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        } else {
          res.status(404).json({ message: "Object could not be created" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }

  destroy = async (req, res) => {
    const dataRequest = this.getDataFromRequest(req)
    await this.logic.destroy({
      where: {
        id: req.params.id
      }
    }).then((r) => {
      if (r) {
        res.status(200).json(r);
      } else {
        res.status(404).json({ message: "Object could not be destroyed" });
      }
    })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }

  getAllData = async (req, res) => {
    await this.logic.getAllData()
      .then((r) => {
        if (r) {
          res.status(200).json(r);
        } else {
          res.status(404).json({ message: "Object could not be found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }
  
  getAllDataFromSpecific = async (req, res) => {
    await this.logic.getAllDataFromSpecific(req.params.id)
      .then((r) => {
        if (r) {
          res.status(201).json(r);
        } else {
          res.status(404).json({ message: "Object could not be found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  }

}

module.exports = Controller;
