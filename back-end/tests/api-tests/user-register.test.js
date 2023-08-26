/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const request = require("supertest");
const dbHandler = require("../db-setup");
const app = require("../../index");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const {
    username, phoneNumber, password, email, wrongEmail,
} = require("../dummy-data/user-dummy-data");

describe("User registration", () => {
    it("should successfully create user", async () => {
        const userData = {
            username, email, password, phoneNumber,
        };

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res.text);
        expect(res.status).toEqual(200);
        expect(resData.message).toEqual("Account is successfully created.");
    });

    it("email missing, error", async () => {
        const userData = {
            password, username, phoneNumber,
        };

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res.text);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email,password, username and phoneNumber, all fields are required.");
    });

    it("password missing, error", async () => {
        const userData = {
            username, email, phoneNumber,
        };

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res.text);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email,password, username and phoneNumber, all fields are required.");
    });

    it("username missing, error", async () => {
        const userData = {
            email, password, phoneNumber,
        };

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res.text);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email,password, username and phoneNumber, all fields are required.");
    });

    it("invalid email, error", async () => {
        const userData = {
            username, email: wrongEmail, password, phoneNumber,
        };

        const res = await request(app).post("/user-register").send(userData);
        const resData = JSON.parse(res.text);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Incorrect email.");
    });
});
