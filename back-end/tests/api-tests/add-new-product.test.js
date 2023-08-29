/* eslint-disable no-undef */
/* eslint-disable no-return-await */
const request = require("supertest");
const bcrypt = require("bcryptjs");

const dbHandler = require("../db-setup");
const app = require("../../index");
const Seller = require("../../models/seller");

const saltRounds = 10;
const { sellerEmail, sellerUsername, sellerPhoneNumber } = require("../dummy-data/seller-dummy-data");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("adds new product", () => {
    it("should add a new product", async () => {
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
        const variation = [{
            property: "red",
            price: 24,
            quantity: 24,
        }];
        const product = {
            name: "product1",
            sellerId,
            tags: ["t1"],
            variation,
            description: "product description",
        };

        const productRequest = await request(app).post(`/add-product/${sellerId}`).send(product).auth(token, { type: "bearer" });
        const productRequestData = JSON.parse(productRequest.text);
        expect(productRequestData.message).toEqual("Product is successfully added");
        expect(productRequestData.data.name).toEqual("product1");
        expect(productRequestData.data.description).toEqual("product description");
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
        const variation = [{
            property: "red",
            price: 24,
            quantity: 24,
        }];
        const product = {
            sellerId,
            tags: ["t1"],
            variation,
            description: "product description",
        };

        const productRequest = await request(app).post(`/add-product/${sellerId}`).send(product).auth(token, { type: "bearer" });
        const productRequestData = JSON.parse(productRequest.text);
        expect(productRequestData.message).toEqual("Every field: name, sellerId, tags, variation, description are required.");
    });

    it("error on missing tags", async () => {
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
        const variation = [{
            property: "red",
            price: 24,
            quantity: 24,
        }];
        const product = {
            name: "product1",
            sellerId,
            variation,
            description: "product description",
        };

        const productRequest = await request(app).post(`/add-product/${sellerId}`).send(product).auth(token, { type: "bearer" });
        const productRequestData = JSON.parse(productRequest.text);
        expect(productRequestData.message).toEqual("Every field: name, sellerId, tags, variation, description are required.");
    });

    it("error on missing variation", async () => {
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
        const product = {
            name: "product1",
            sellerId,
            tags: ["t1"],
            description: "product description",
        };

        const productRequest = await request(app).post(`/add-product/${sellerId}`).send(product).auth(token, { type: "bearer" });
        const productRequestData = JSON.parse(productRequest.text);
        expect(productRequestData.message).toEqual("Every field: name, sellerId, tags, variation, description are required.");
    });

    it("error on missing description", async () => {
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
        const variation = [{
            property: "red",
            price: 24,
            quantity: 24,
        }];
        const product = {
            name: "product1",
            sellerId,
            tags: ["t1"],
            variation,
        };

        const productRequest = await request(app).post(`/add-product/${sellerId}`).send(product).auth(token, { type: "bearer" });
        const productRequestData = JSON.parse(productRequest.text);
        expect(productRequestData.message).toEqual("Every field: name, sellerId, tags, variation, description are required.");
    });

    it("no token present, should give error", async () => {
        const category = { category: "mobile" };
        const categoryRequest = await request(app).post("/add-product/id").send(category);
        const categoryRequestData = JSON.parse(categoryRequest.text);
        expect(categoryRequestData.message).toEqual("Access denied!");
    });

    it("invalid token present, should give error", async () => {
        const category = { category: "mobile" };
        const productsListRequest = await request(app).post("/add-product/id").send(category).auth("xc", { type: "bearer" });
        const categoryRequestData = JSON.parse(productsListRequest.text);
        expect(categoryRequestData.message).toEqual("Invalid Token");
    });
});
