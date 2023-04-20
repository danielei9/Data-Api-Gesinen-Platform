const request = require('supertest');
const app = require('../server/index.js');
const path = "localhost:3000"

describe('API CRUD tests', () => {
  let id;
  // Prueba para crear un nuevo recurso
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password'
      };
  
      const response = await request(app)
        .post('/users')
        .send(user);
  
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
  
      // Comprueba que el usuario se haya creado correctamente en la base de datos
      const createdUser = await User.findOne({ where: { email: user.email } });
      expect(createdUser).not.toBeNull();
    });
  });
  
  // Prueba para obtener un recurso existente
  test('Should get an existing resource', async () => {
    const res = await request(app).get(`${path}/api/v1_1/user/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.name).toBe('Example resource');
  });
  // Prueba para actualizar un recurso existente
  test('Should update an existing resource', async () => {
    const res = await request(app)
      .put(`${path}/api/v1_1/user/${id}`)
      .send({ name: 'Updated resource' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated resource');
  });
  // Prueba para eliminar un recurso existente
  test('Should delete an existing resource', async () => {
    const res = await request(app).delete(`${path}/api/v1_1/user/${id}`);
    expect(res.statusCode).toBe(204);
  });
});