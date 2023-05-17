const dbHandler = require('../db-setup');
const ProductsVariation = require("../../models/product-variation");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    variationQuantity1, variationPrice1, variationProperty1, variationQuantityWrong, variationPriceWrong
} = require("../dummy-data/products-variation-dummy-data");


describe('products variation schema', () => {

    it('should successfully create user', async () => {
        const data = {
            property: variationProperty1, quantity: variationQuantity1, price: variationPrice1
        }
        const variation = await ProductsVariation.create(data);
        expect(variation.property).toEqual(variationProperty1);
        expect(variation.quantity).toEqual(variationQuantity1);
        expect(variation.price).toEqual(variationPrice1);
    });

    it('error on missing property', async () => {
        const data = {
            quantity: variationQuantity1, price: variationPrice1
        }

        try {
            const variation = await ProductsVariation.create(data);
            expect(variation.property).toEqual(variationProperty1);

        } catch (error) {
            expect(error["errors"]["property"]["kind"]).toEqual("required")
            expect(error["errors"]["property"]["path"]).toEqual("property")
        }
    });

    it('error on missing quantity', async () => {
        const data = {
            property: variationProperty1, quantity: variationQuantity1, price: variationPrice1
        }

        try {
            const variation = await ProductsVariation.create(data);
            expect(variation.quantity).toEqual(variationQuantity1);

        } catch (error) {
            expect(error["errors"]["quantity"]["kind"]).toEqual("required")
            expect(error["errors"]["quantity"]["path"]).toEqual("quantity")
        }
    });

    it('error on missing price', async () => {
        const data = {
            property: variationProperty1, quantity: variationQuantity1
        }

        try {
            const variation = await ProductsVariation.create(data);
            expect(variation.price).toEqual(variationPrice1);

        } catch (error) {
            expect(error["errors"]["price"]["kind"]).toEqual("required")
            expect(error["errors"]["price"]["path"]).toEqual("price")
        }
    });

    it('error on wrong price', async () => {
        const data = {
            property: variationProperty1, quantity: variationQuantity1, price: variationPriceWrong
        }

        try {
            const variation = await ProductsVariation.create(data);
            expect(variation.price).toEqual(variationPrice1);

        } catch (error) {
            expect(error["errors"]["price"]["kind"]).toEqual("min")
            expect(error["errors"]["price"]["path"]).toEqual("price")
        }
    });

    it('error on wrong quantity', async () => {
        const data = {
            property: variationProperty1, quantity: variationQuantityWrong, price: variationPrice1
        }

        try {
            const variation = await ProductsVariation.create(data);
            expect(variation.quantity).toEqual(variationPrice1);

        } catch (error) {
            expect(error["errors"]["quantity"]["kind"]).toEqual("min")
            expect(error["errors"]["quantity"]["path"]).toEqual("quantity")
        }
    });
});
