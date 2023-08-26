/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const dbHandler = require("../db-setup");
const UserAddress = require("../../models/user-address");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    userAddressUnitNumber: unitNumber,
    userAddressStreetNumber: streetNumber,
    userAddressAddressLine1: addressLine1,
    userAddressAddressLine2: addressLine2,
    userAddressCity: city,
    userAddressState: state,
    userAddressPostalCode: postalCode,
    userAddressCountry: country,
} = require("../dummy-data/user-address-dummy-data");

describe("user schema ", () => {
    it("should successfully create user address", async () => {
        const data = {
            unitNumber, streetNumber, addressLine1, addressLine2, city, state, postalCode, country,
        };
        const userAddress1 = await UserAddress.create(data);
        expect(userAddress1.unitNumber).toEqual(unitNumber);
    });

    it("error on missing unit number", async () => {
        const data = {
            streetNumber, addressLine1, addressLine2, city, state, postalCode, country,
        };

        try {
            const userAddress1 = await UserAddress.create(data);
            expect(userAddress1.unitNumber).toEqual(unitNumber);
        } catch (error) {
            expect(error.errors.unitNumber.kind).toEqual("required");
            expect(error.errors.unitNumber.path).toEqual("unitNumber");
        }
    });

    it("error on missing address line 1", async () => {
        const data = {
            unitNumber, streetNumber, addressLine2, city, state, postalCode, country,
        };

        try {
            const userAddress1 = await UserAddress.create(data);
            expect(userAddress1.addressLine1).toEqual(addressLine1);
        } catch (error) {
            expect(error.errors.addressLine1.kind).toEqual("required");
            expect(error.errors.addressLine1.path).toEqual("addressLine1");
        }
    });

    it("error on missing city", async () => {
        const data = {
            unitNumber, streetNumber, addressLine1, addressLine2, state, postalCode, country,
        };
        try {
            const userAddress1 = await UserAddress.create(data);
            expect(userAddress1.city).toEqual(city);
        } catch (error) {
            expect(error.errors.city.kind).toEqual("required");
            expect(error.errors.city.path).toEqual("city");
        }
    });

    it("error on missing state", async () => {
        const data = {
            unitNumber, streetNumber, addressLine1, addressLine2, city, postalCode, country,
        };
        try {
            const userAddress1 = await UserAddress.create(data);
            expect(userAddress1.state).toEqual(state);
        } catch (error) {
            expect(error.errors.state.kind).toEqual("required");
            expect(error.errors.state.path).toEqual("state");
        }
    });

    it("error on missing postal code", async () => {
        const data = {
            unitNumber, streetNumber, addressLine1, addressLine2, city, state, country,
        };
        try {
            const userAddress1 = await UserAddress.create(data);
            expect(userAddress1.postalCode).toEqual(postalCode);
        } catch (error) {
            expect(error.errors.postalCode.kind).toEqual("required");
            expect(error.errors.postalCode.path).toEqual("postalCode");
        }
    });

    it("error on missing country", async () => {
        const data = {
            unitNumber, streetNumber, addressLine1, addressLine2, city, state, postalCode,
        };
        try {
            const userAddress1 = await UserAddress.create(data);
            expect(userAddress1.country).toEqual(country);
        } catch (error) {
            expect(error.errors.country.kind).toEqual("required");
            expect(error.errors.country.path).toEqual("country");
        }
    });
});
