const dbHandler = require('../db-setup');
const app = require("../../index");
const request = require("supertest");
const User = require("../../models/user");
const saltRounds = 10;
const bcrypt = require("bcryptjs");

const {username, phoneNumber, password, email, wrongEmail, wrongPassword} = require("../dummy-data/user-dummy-data");

beforeAll(async () => {
    await dbHandler.connect()

    const password = await bcrypt.hash("password", saltRounds);
    const user = new User({
        email, password, username, phoneNumber
    });

    await user.save();
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("User Login", () => {
    it("should successfully login user", async () => {
        const userData = {
            email, password
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(200);
        expect(resData.message).toEqual("Successfully logged in");
    });

    it("error for wrong email", async () => {
        const userData = {
            email: wrongEmail, password
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(500);
        expect(resData.message).toEqual("Wrong email or password. Try Again");
    });

    it("error for wrong password", async () => {
        const userData = {
            email, password: wrongPassword
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(500);
        expect(resData.message).toEqual("Wrong email or password. Try Again");
    });

    it("error for email missing", async () => {
        const userData = {
            password
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email and password both are required.");
    });

    it("error for password missing", async () => {
        const userData = {
            email
        }

        const res = await request(app).post("/user-login").send(userData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email and password both are required.");
    });
});
