/* eslint-disable no-undef */
/* eslint-disable no-return-await */
const request = require("supertest");
const bcrypt = require("bcryptjs");

const dbHandler = require("../db-setup");
const app = require("../../index");
const Seller = require("../../models/seller");

const saltRounds = 10;
const { sellerEmail, sellerUsername, sellerPhoneNumber } = require("../dummy-data/seller-dummy-data");
const { name, storeAddress } = require("../dummy-data/store-fake-data");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("adds new store", () => {
    it("should add a new store", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber,
        });

        await seller.save();

        const sellerData = {
            email: sellerEmail, password: "sellerPassword",
        };
        const sellerId = seller.id;
        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest.text);
        const { token } = loginRequestData.data;

        const store = {
            name,
            address: storeAddress,
        };

        const storeRequest = await request(app).post(`/add-store/${sellerId}`).send(store).auth(token, { type: "bearer" });
        const storeRequestData = JSON.parse(storeRequest.text);
        expect(storeRequestData.message).toEqual("Store is successfully added.");
        expect(storeRequestData.data.name).toEqual("storeName");
    });

    it("error on missing name", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber,
        });

        await seller.save();

        const sellerData = {
            email: sellerEmail, password: "sellerPassword",
        };
        const sellerId = seller.id;
        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest.text);
        const { token } = loginRequestData.data;

        const store = {
            address: storeAddress,
        };

        const storeRequest = await request(app).post(`/add-store/${sellerId}`).send(store).auth(token, { type: "bearer" });
        const storeRequestData = JSON.parse(storeRequest.text);
        expect(storeRequestData.message).toEqual("Name, sellerId and address all are required.");
    });

    it("error on missing address", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber,
        });

        await seller.save();

        const sellerData = {
            email: sellerEmail, password: "sellerPassword",
        };
        const sellerId = seller.id;
        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest.text);
        const { token } = loginRequestData.data;
        const store = {
            name,
        };

        const storeRequest = await request(app).post(`/add-store/${sellerId}`).send(store).auth(token, { type: "bearer" });
        const storeRequestData = JSON.parse(storeRequest.text);
        expect(storeRequestData.message).toEqual("Name, sellerId and address all are required.");
    });

    it("no token present, should give error", async () => {
        const store = {
            name,
            address: storeAddress,
        };
        const categoryRequest = await request(app).post("/add-store/id").send(store);
        const categoryRequestData = JSON.parse(categoryRequest.text);
        expect(categoryRequestData.message).toEqual("Access denied!");
    });

    it("invalid token present, should give error", async () => {
        const store = {
            name,
            address: storeAddress,
        };
        const productsListRequest = await request(app).post("/add-store/id").send(store).auth("xc", { type: "bearer" });
        const categoryRequestData = JSON.parse(productsListRequest.text);
        expect(categoryRequestData.message).toEqual("Invalid Token");
    });
});
