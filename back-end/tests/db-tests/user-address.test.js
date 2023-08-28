/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const dbHandler = require("../db-setup");
const UserAddress = require("../../models/address");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    userAddressUnitNumber: unitNumber,
    userAddressStreetNumber: streetNumber,
    userAddressLocality: locality,
    userAddressLandmark: landmark,
    userAddressCity: city,
    userAddressState: state,
    userAddressPinCode: pinCode,
    userAddressCountry: country,
} = require("../dummy-data/user-address-dummy-data");

describe("user schema ", () => {
    it("should successfully create user address", async () => {
        const data = {
            unitNumber, streetNumber, locality, landmark, city, state, pinCode, country,
        };
        const userAddress = await UserAddress.create(data);
        expect(userAddress.unitNumber).toEqual(unitNumber);
    });

    it("error on missing unit number", async () => {
        const data = {
            streetNumber, locality, landmark, city, state, pinCode, country,
        };

        try {
            const userAddress = await UserAddress.create(data);
            expect(userAddress.unitNumber).toEqual(unitNumber);
        } catch (error) {
            expect(error.errors.unitNumber.kind).toEqual("required");
            expect(error.errors.unitNumber.path).toEqual("unitNumber");
        }
    });

    it("error on missing city", async () => {
        const data = {
            unitNumber, streetNumber, state, pinCode, country,
        };
        try {
            const userAddress = await UserAddress.create(data);
            expect(userAddress.city).toEqual(city);
        } catch (error) {
            expect(error.errors.city.kind).toEqual("required");
            expect(error.errors.city.path).toEqual("city");
        }
    });

    it("error on missing state", async () => {
        const data = {
            unitNumber, streetNumber, locality, landmark, city, pinCode, country,
        };
        try {
            const userAddress = await UserAddress.create(data);
            expect(userAddress.state).toEqual(state);
        } catch (error) {
            expect(error.errors.state.kind).toEqual("required");
            expect(error.errors.state.path).toEqual("state");
        }
    });

    it("error on missing pinCode", async () => {
        const data = {
            unitNumber, streetNumber, locality, landmark, city, state, country,
        };
        try {
            const userAddress = await UserAddress.create(data);
            expect(userAddress.pinCode).toEqual(pinCode);
        } catch (error) {
            expect(error.errors.pinCode.kind).toEqual("required");
            expect(error.errors.pinCode.path).toEqual("pinCode");
        }
    });

    it("error on missing country", async () => {
        const data = {
            unitNumber, streetNumber, locality, landmark, city, state, pinCode,
        };
        try {
            const userAddress = await UserAddress.create(data);
            expect(userAddress.country).toEqual(country);
        } catch (error) {
            expect(error.errors.country.kind).toEqual("required");
            expect(error.errors.country.path).toEqual("country");
        }
    });
});
