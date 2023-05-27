const dbHandler = require('../db-setup');
const app = require("../../index");
const request = require("supertest");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const {
    sellerEmail,
    sellerPassword,
    sellerUsername,
    sellerPhoneNumber,
    sellerWrongEmail
} = require("../dummy-data/seller-dummy-data");


describe("User registration", () => {
    it("should successfully create user", async () => {
        const userData = {
            username: sellerUsername, email: sellerEmail, password: sellerPassword, phoneNumber: sellerPhoneNumber
        }

        const res = await request(app).post("/seller-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(200);
        expect(resData.message).toEqual("Account is successfully created.");
    });

    it("email missing, error", async () => {
        const userData = {
            username: sellerUsername, password: sellerPassword, phoneNumber: sellerPhoneNumber
        }

        const res = await request(app).post("/seller-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email, password, username and phoneNumber, all fields are required.");
    });

    it("password missing, error", async () => {
        const userData = {
            username: sellerUsername, email: sellerEmail, phoneNumber: sellerPhoneNumber
        }

        const res = await request(app).post("/seller-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email, password, username and phoneNumber, all fields are required.");
    });

    it("username missing, error", async () => {
        const userData = {
            email: sellerEmail, password: sellerPassword, phoneNumber: sellerPhoneNumber
        }

        const res = await request(app).post("/seller-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email, password, username and phoneNumber, all fields are required.");
    });

    it("phone number missing, error", async () => {
        const userData = {
            email: sellerEmail, password: sellerPassword, username: sellerUsername,
        }

        const res = await request(app).post("/seller-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email, password, username and phoneNumber, all fields are required.");
    });

    it("invalid email, error", async () => {
        const userData = {
            username: sellerUsername, email: sellerWrongEmail, password: sellerPassword, phoneNumber: sellerPhoneNumber
        }

        const res = await request(app).post("/seller-register").send(userData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Incorrect email.");
    });
});