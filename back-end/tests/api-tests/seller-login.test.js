const dbHandler = require('../db-setup');
const app = require("../../index");
const request = require("supertest");
const Seller = require("../../models/seller");
const saltRounds = 10;
const bcrypt = require("bcryptjs");

const {
    sellerEmail,
    sellerUsername,
    sellerPassword,
    sellerWrongPassword,
    sellerWrongEmail, sellerPhoneNumber
} = require("../dummy-data/seller-dummy-data");

beforeAll(async () => {
    await dbHandler.connect()

    const password = await bcrypt.hash("sellerPassword", saltRounds);
    const seller = new Seller({
        email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber
    });

    await seller.save();
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Seller Login", () => {
    it("should successfully login seller", async () => {
        const sellerData = {
            email: sellerEmail, password: sellerPassword
        }

        const res = await request(app).post("/seller-login").send(sellerData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(200);
        expect(resData.message).toEqual("Successfully logged in");
    });

    it("error for wrong email", async () => {
        const sellerData = {
            email: sellerWrongEmail, password: sellerPassword
        }

        const res = await request(app).post("/seller-login").send(sellerData);
        const resData = JSON.parse(res["text"])
        expect(res.status).toEqual(500);
        expect(resData.message).toEqual("Wrong email or password. Try Again");
    });

    it("error for wrong password", async () => {
        const sellerData = {
            email: sellerEmail, password: sellerWrongPassword
        }

        const res = await request(app).post("/seller-login").send(sellerData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(500);
        expect(resData.message).toEqual("Wrong email or password. Try Again");
    });

    it("error for email missing", async () => {
        const sellerData = {
            password: sellerPassword
        }

        const res = await request(app).post("/seller-login").send(sellerData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email and password both are required.");
    });

    it("error for password missing", async () => {
        const sellerData = {
            email: sellerEmail
        }

        const res = await request(app).post("/seller-login").send(sellerData);
        const resData = JSON.parse(res["text"]);
        expect(res.status).toEqual(400);
        expect(resData.message).toEqual("Email and password both are required.");
    });
});
