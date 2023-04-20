'use strict';
//sequelize model:generate --name role.model --attributes name:string
const bcrypt = require("bcryptjs");

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.user.belongsToMany(models.council, {
      //   through: "user_council",
      //   foreignKey: "userId",
      //   otherKey: "councilId"
      // });
      // models.user.belongsToMany(models.business, {
      //   through: "user_business",
      //   foreignKey: "userId",
      //   otherKey: "businessId",
      //   required: true
      // });
      // models.user.belongsToMany(models.userRol, {
      //   through: "user_rol",
      //   foreignKey: "userId",
      //   otherKey: "roleId",
      //   required: true
      // });
    }

    static async createUserWithUserRol(user) {
      // Crea el nuevo usuario
      const newUser = await this.create({
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        pswd: user.pswd,
        phone: user.phone,
        postalCode: user.postalCode,
        street: user.street,
        locality: user.locality,
        country: user.country,
      });
      // // Obtiene el UserRol
      const userRol = await UserRol.findOne({
        where: {
          name: user.userRolName
        }
      });

      try {
        await newUser.addUserRols(userRol.id);
        await newUser.addCouncils(user.councils);
        await newUser.addBusinesses(user.businesses);
      } catch (error) {
        console.log(error)
        throw error;
      }
      return newUser;
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      get() {
        const username = this.getDataValue('username');
        return username;
      }
    },
    jwt: {
      type: DataTypes.TEXT,
      get() {
        const jwt = this.getDataValue('jwt');
        return jwt;
      }
    },
    surname: {
      type: DataTypes.STRING,
      get() {
        const surname = this.getDataValue('surname');
        return surname;
      }
    },
    phone: {
      type: DataTypes.STRING,
      get() {
        const phone = this.getDataValue('phone');
        return phone;
      },
      set(value) {
        this.setDataValue('phone', value);
      },
    },
    email: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('email', value);
      },
      get() {
        const email = this.getDataValue('email');
        return email;
      }
    },
    pswd: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('pswd', bcrypt.hashSync(value, 8).toString());
      },
      get() {
        const pswd = this.getDataValue('pswd');
        return pswd;
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('postalCode', value);
      },
      get() {
        const postalCode = this.getDataValue('postalCode');
        return postalCode;
      }
    },
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('name', value);
      },
      get() {
        const name = this.getDataValue('name');
        return name;
      }
    },
    street: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('street', value);
      },
      get() {
        const street = this.getDataValue('street');
        return street;
      }
    },
    locality: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('locality', value);
      },
      get() {
        const locality = this.getDataValue('locality');
        return locality;
      }
    },
    country: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('country', value);
      },
      get() {
        const country = this.getDataValue('country');
        return country;
      }
    },
  }, {
    sequelize,
    freezeTableName: true,
  });

  return User;
};
