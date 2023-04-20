const request = require('request');
const express = require('express')
const app = express();
const path = "http://localhost:3000"

const { User } = require("../server/models");
const { expect } = require('chai');


before(async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
})


describe("User model", () => {

  it("creates a user", async () => {
    const options = {
      url: `${path}/api/v1_1/user`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: "johndoe",
        surname: "Doe",
        phone: "1234567890",
        email: "johndoe@example.com",
        pswd: "password",
        postalCode: "12345",
        name: "John",
        street: "1 Main St",
        locality: "Anytown",
        country: "USA"
      },
      json: true
    };
    await request.post(options, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
      }
      expect(response.statusCode).equals(201);
      expect(response.body.username).equals("johndoe");
      expect(response.body.surname).equals("Doe");
      expect(response.body.phone).equals("1234567890");
      expect(response.body.email).equals("johndoe@example.com");
      expect(response.body.postalCode).equals("12345");
      expect(response.body.name).equals("John");
      expect(response.body.street).equals("1 Main St");
      expect(response.body.locality).equals("Anytown");
      expect(response.body.country).equals("USA");
    });
  });

  
  it("throws an error if required fields are missing", async () => {
    const options = {
      url: `${path}/api/v1_1/user`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        surname: "Doe",
        phone: "1234567890",
        email: "johndoe@example.com",
        pswd: "password",
        postalCode: "12345",
        name: "John",
        street: "1 Main St",
        locality: "Anytown",
        country: "USA"
      },
      json: true
    };
    await request.post(options, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
      }
      expect(response.body.error).equals("Username is required.");
    });
  });
})



describe('API CRUD tests', () => {
  // Prueba para crear un nuevo recurso
  describe('POST /user', () => {
    it('should create a new user', async () => {
      const options = {
        url: `${path}/api/v1_1/user`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password'
        },
        json: true
      };

      await request.post(options, function (error, response, body) {
        if (error) {
          console.error('Error:', error);
        }
        expect(response.statusCode).equals(201);
        expect(response.body.name).equals("John Doe");
        expect(response.body.email).equals("johndoe@example.com");
      });

      // Comprueba que el usuario se haya creado correctamente en la base de datos
      //const createdUser = await User.findOne({ where: { email: user.email } });
      //expect(createdUser).not.equalsNull();
    });
  });
});


describe("User sign-up", () => {
  it("creates a user", async () => {
    const options = {
      url: `${path}/api/v1_1/user`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: "johndoe",
        surname: "Doe",
        phone: "1234567890",
        email: "johndoe@example.com",
        pswd: "password",
        postalCode: "12345",
        name: "John",
        street: "1 Main St",
        locality: "Anytown",
        country: "USA"
      },
      json: true
    };

    await request.post(options, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
      }
      expect(response.statusCode).equals(201);
      expect(response.body.username).equals("johndoe");
      expect(response.body.email).equals("johndoe@example.com");
    });
  })

  it("creates a council", async () => {
    const options = {
      url: `${path}/api/v1_1/council`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        phone: "627669090",
        postalCode: 46009,
        name: "TestName",
        email: "council@gmail.com",
        locality: "Valencia",
        address: "Tia coja 2 -5 ",
        country: "Spain",
        web: "Buchspro.es",
        state: "Com Val",
        contact_person: 1,
        user_creator: 1,
        user_last_modificated: 1
      },
      json: true
    };
    await request.post(options, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
      }
      expect(response.statusCode).equals(201);
      expect(response.body.phone).equals("627669090");
      expect(response.body.email).equals("council@gmail.com");
      expect(response.body.postalCode).equals("46009");
      expect(response.body.name).equals("TestName");
      expect(response.body.address).equals("Tia coja 2 -5 ");
      expect(response.body.locality).equals("Valencia");
      expect(response.body.country).equals("Spain");
      expect(response.body.web).equals("Buchspro.es");
      expect(response.body.state).equals("Com Val");
      expect(response.body.contact_person).equals(1)
      expect(response.body.user_creator).equals(1)
      expect(response.body.user_last_modificated).equals(1)
    });
  })

  it("creates a business", async () => {
    const options = {
      url: `${path}/api/v1_1/business`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        postalCode: "46009",
        country: "Spain",
        locality: "Valencia",
        address: "VLC",
        web: "www.lojk.es",
        state: "Cm Valencia",
        name: "asd",
        surname: "asddas",
        artist_name: "asd",
        phone: "asd",
        user_creator: 1,
        user_last_modificated: 1,
        contact_person: 1,
        councilIds:[1]
      },
      json: true
    };
    await request.post(options, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
      }
      expect(response.statusCode).equals(201);
      expect(response.body.postalCode).equals("46009");
      expect(response.body.country).equals("1asd23");
      expect(response.body.locality).equals("Valencia");
      expect(response.body.address).equals("VLC");
      expect(response.body.web).equals("www.lojk.es");
      expect(response.body.state).equals("Cm Valencia");
      expect(response.body.name).equals("asd");
      expect(response.body.surname).equals("asddas");
      expect(response.body.artist_name).equals("asd");
      expect(response.body.user_creator).equals(1);
      expect(response.body.user_last_modificated).equals(1);
      expect(response.body.contact_person).equals(1);
      expect(response.body.councilIds).equals([1]);
    });
  })

  it("Sign-up user", async () => {
    const options = {
      url: `${path}/api/V1_1/auth/signup`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: "johndoe",
        email: "johndoe@example.com",
        pswd: "password",
        name: "John",
        surname: "adamin",
        phone: "1234567890",
        street: "1 Main St",
        locality: "Anytown",
        postalCode: "12345",
        country: "USA",
        userRols:["admin"],
        councilId: 1,
        businessId: 1
      },
      json: true
    };
    await request.post(options, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
      }
      expect(response.statusCode).equals(201);
    });
  })
})
