/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const dbHandler = require("../db-setup");
const Seller = require("../../models/seller");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    sellerUsername,
    sellerEmail,
    sellerPassword,
    sellerPhoneNumber,
    sellerOrdersReceived,
    sellerStoreAddress,
    sellerHomeAddress,
} = require("../dummy-data/seller-dummy-data");

describe("seller schema", () => {
    it("should successfully create seller", async () => {
        const data = {
            username: sellerUsername,
            email: sellerEmail,
            password: sellerPassword,
            phoneNumber: sellerPhoneNumber,
            homeAddress: sellerHomeAddress,
            storeAddress: sellerStoreAddress,
            ordersReceived: sellerOrdersReceived,
        };
        const seller = await Seller.create(data);
        expect(seller.username).toEqual(sellerUsername);
        expect(seller.email).toEqual(sellerEmail);
        expect(seller.storeAddress).toEqual(sellerStoreAddress);
    });

    it("should successfully create seller without home address, store address, orders received", async () => {
        const data = {
            username: sellerUsername, email: sellerEmail, password: sellerPassword, phoneNumber: sellerPhoneNumber,
        };
        const seller = await Seller.create(data);
        expect(seller.username).toEqual(sellerUsername);
        expect(seller.email).toEqual(sellerEmail);
        expect(seller.phoneNumber).toEqual(sellerPhoneNumber);
    });

    it("error on missing username", async () => {
        const data = {
            email: sellerEmail, password: sellerPassword, phoneNumber: sellerPhoneNumber,
        };
        try {
            const seller = await Seller.create(data);
            expect(seller.username).toEqual(sellerUsername);
        } catch (error) {
            expect(error.errors.username.kind).toEqual("required");
            expect(error.errors.username.path).toEqual("username");
        }
    });

    it("error on missing email", async () => {
        const data = {
            username: sellerUsername, password: sellerPassword, phoneNumber: sellerPhoneNumber,
        };
        try {
            const seller = await Seller.create(data);
            expect(seller.email).toEqual(sellerEmail);
        } catch (error) {
            expect(error.errors.email.kind).toEqual("required");
            expect(error.errors.email.path).toEqual("email");
        }
    });

    it("error on missing phone number", async () => {
        const data = {
            username: sellerUsername, email: sellerEmail, password: sellerPassword,
        };
        try {
            const seller = await Seller.create(data);
            expect(seller.phoneNumber).toEqual(sellerPhoneNumber);
        } catch (error) {
            expect(error.errors.phoneNumber.kind).toEqual("required");
            expect(error.errors.phoneNumber.path).toEqual("phoneNumber");
        }
    });

    it("error on missing password", async () => {
        const data = {
            username: sellerUsername, email: sellerEmail, phoneNumber: sellerPhoneNumber,
        };
        try {
            const seller = await Seller.create(data);
            expect(seller.username).toEqual(sellerUsername);
        } catch (error) {
            expect(error.errors.password.kind).toEqual("required");
            expect(error.errors.password.path).toEqual("password");
        }
    });
});
