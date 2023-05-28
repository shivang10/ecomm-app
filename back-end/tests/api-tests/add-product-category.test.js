const dbHandler = require('../db-setup');
const app = require("../../index");
const request = require("supertest");
const Seller = require("../../models/seller");
const saltRounds = 10;
const bcrypt = require("bcryptjs");
const {sellerEmail, sellerUsername, sellerPhoneNumber} = require("../dummy-data/seller-dummy-data");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("adds product category", () => {
    it("should add a new product category of type mobile", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber
        });

        await seller.save();

        const sellerData = {
            "email": sellerEmail, "password": "sellerPassword"
        }

        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest["text"])
        const token = loginRequestData["data"]["token"];

        const category = {"category": "mobile"};
        const categoryRequest = await request(app).post("/add-product-category").send(category).auth(token, {type: 'bearer'});
        const categoryRequestData = JSON.parse(categoryRequest["text"]);
        expect(categoryRequestData["message"]).toEqual("Category is successfully created.");
        expect(categoryRequestData["data"]["category"]).toEqual("mobile");
    });

    it("error on empty category", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber
        });

        await seller.save();

        const sellerData = {
            "email": sellerEmail, "password": "sellerPassword"
        }

        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest["text"])
        const token = loginRequestData["data"]["token"];

        const category = null;
        const categoryRequest = await request(app).post("/add-product-category").send(category).auth(token, {type: 'bearer'});
        const categoryRequestData = JSON.parse(categoryRequest["text"]);
        expect(categoryRequestData["message"]).toEqual("Category is required.");
    });

    it("no token present, should give error", async () => {
        const category = {"category": "mobile"};
        const categoryRequest = await request(app).post("/add-product-category").send(category);
        const categoryRequestData = JSON.parse(categoryRequest["text"]);
        expect(categoryRequestData["message"]).toEqual("Access denied!");
    });

    it("invalid token present, should give error", async () => {
        const category = {"category": "mobile"};
        const productsListRequest = await request(app).post("/add-product-category").send(category).auth("xc", {type: 'bearer'});
        const categoryRequestData = JSON.parse(productsListRequest["text"]);
        expect(categoryRequestData["message"]).toEqual("Invalid Token");
    });
});