/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-return-await */
const request = require("supertest");
const bcrypt = require("bcryptjs");
const dbHandler = require("../db-setup");
const app = require("../../index");
const Seller = require("../../models/seller");

const saltRounds = 10;
const { sellerEmail, sellerUsername, sellerPhoneNumber } = require("../dummy-data/seller-dummy-data");
const {
    addressUnitNumber, addressStreetNumber, addressLocality, addressLandmark, addressCity, addressState, addressPinCode, addressCountry,
} = require("../dummy-data/seller-fake-address-data");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("test for adds seller address", () => {
    it("should add address", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber,
        });

        const sellerInfo = await seller.save();

        const sellerData = {
            email: sellerEmail, password: "sellerPassword",
        };

        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest.text);
        const sellerId = sellerInfo._id;
        const { token } = loginRequestData.data;

        const address = {
            unitNumber: addressUnitNumber, streetNumber: addressStreetNumber, locality: addressLocality, landmark: addressLandmark, city: addressCity, state: addressState, pinCode: addressPinCode, country: addressCountry,
        };
        const addressRequest = await request(app).post(`/add-seller-address/${sellerId}`).send(address).auth(token, { type: "bearer" });
        const addressRequestData = JSON.parse(addressRequest.text);
        expect(addressRequestData.message).toEqual("Address is successfully added.");
    });

    it("error on missing values values", async () => {
        const password = await bcrypt.hash("sellerPassword", saltRounds);
        const seller = new Seller({
            email: sellerEmail, password, username: sellerUsername, phoneNumber: sellerPhoneNumber,
        });

        const sellerInfo = await seller.save();
        const sellerId = sellerInfo._id;

        const sellerData = {
            email: sellerEmail, password: "sellerPassword",
        };

        const loginRequest = await request(app).post("/seller-login").send(sellerData);
        const loginRequestData = JSON.parse(loginRequest.text);
        const { token } = loginRequestData.data;

        const address = {
            streetNumber: addressStreetNumber, locality: addressLocality, landmark: addressLandmark, city: addressCity, state: addressState, pinCode: addressPinCode, country: addressCountry,
        };
        const addressRequest = await request(app).post(`/add-seller-address/${sellerId}`).send(address).auth(token, { type: "bearer" });
        const addressRequestData = JSON.parse(addressRequest.text);
        expect(addressRequestData.message).toEqual("unitNumber, locality, city, state, pinCode, country all are required.");
    });

    it("no token present, should give error", async () => {
        const address = {
            unitNumber: addressUnitNumber, streetNumber: addressStreetNumber, locality: addressLocality, landmark: addressLandmark, city: addressCity, state: addressState, pinCode: addressPinCode, country: addressCountry,
        };
        const categoryRequest = await request(app).post("/add-seller-address/some-id").send(address);
        const categoryRequestData = JSON.parse(categoryRequest.text);
        expect(categoryRequestData.message).toEqual("Access denied!");
    });

    it("invalid token present, should give error", async () => {
        const address = {
            unitNumber: addressUnitNumber, streetNumber: addressStreetNumber, locality: addressLocality, landmark: addressLandmark, city: addressCity, state: addressState, pinCode: addressPinCode, country: addressCountry,
        };
        const productsListRequest = await request(app).post("/add-seller-address/some-id").send(address).auth("xc", { type: "bearer" });
        const categoryRequestData = JSON.parse(productsListRequest.text);
        expect(categoryRequestData.message).toEqual("Invalid Token");
    });
});
