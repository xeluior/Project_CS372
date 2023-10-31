const request = require('supertest')
const mongodb = require('mongodb')
const app = require('../src/index.js')

describe("Test authentication", () => {
  beforeAll(() => {
    const client = new mongodb.MongoClient(process.env.MONGO_URI)
    const db = client.db(process.env.DB)
    const users = db.collection('users')

    users.deleteMany({})
  })

  it("Add a new user", (done) => {
    request(app)
      .post('/auth/create')
      .send({ email: "test@example.com", password: "password" })
      .expect(303, done)
  })

  it("Login as test@example.com", (done) => {
    request(app)
      .post('/auth/login')
      .send({ email: "test@example.com", password: "password" })
      .expect(303, done)
  })

  it("Delete the new user", (done) => {
    request(app)
      .post('/auth/delete')
      .send({ email: "test@example.com" })
      .expect(303, done)
  })
})
