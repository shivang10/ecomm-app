/* eslint-disable no-undef */
/* eslint-disable no-return-await */
const dbHandler = require("../db-setup");
const ProductsVariation = require("../../models/product-variation");
const Products = require("../../models/products");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    variationQuantity1, variationPrice1, variationProperty1,
} = require("../dummy-data/products-variation-dummy-data");

const {
    productDescription1, productSellerId1, productTags1, productName1,
} = require("../dummy-data/products-dummy-data");

describe("products schema", () => {
    const variationData = {
        property: variationProperty1, quantity: variationQuantity1, price: variationPrice1,
    };

    it("should successfully save product", async () => {
        const productVariations1 = await ProductsVariation.create(variationData);
        const productData = {
            name: productName1,
            sellerId: productSellerId1,
            tags: productTags1,
            variation: [productVariations1],
            description: productDescription1,
        };

        const product = await Products.create(productData);

        expect(product.name).toEqual(productName1);
        expect(product.sellerId).toEqual(productSellerId1);
        expect(product.tags).toEqual(productTags1);
    });

    it("error on missing product name", async () => {
        const productVariations1 = await ProductsVariation.create(variationData);
        const productData = {
            name: productName1,
            sellerId: productSellerId1,
            tags: productTags1,
            variation: [productVariations1],
            description: productDescription1,
        };

        try {
            const product = await Products.create(productData);
            expect(product.name).toEqual(productName1);
        } catch (error) {
            expect(error.errors.name.kind).toEqual("required");
            expect(error.errors.name.path).toEqual("name");
        }
    });

    it("error on missing product sellerId", async () => {
        const productVariations1 = await ProductsVariation.create(variationData);
        const productData = {
            name: productName1,
            tags: productTags1,
            variation: [productVariations1],
            description: productDescription1,
        };

        try {
            const product = await Products.create(productData);
            expect(product.sellerId).toEqual(productSellerId1);
        } catch (error) {
            expect(error.errors.sellerId.kind).toEqual("required");
            expect(error.errors.sellerId.path).toEqual("sellerId");
        }
    });

    it("error on missing product tags", async () => {
        const productVariations1 = await ProductsVariation.create(variationData);
        const productData = {
            name: productName1,
            sellerId: productSellerId1,
            variation: [productVariations1],
            description: productDescription1,
        };

        try {
            const product = await Products.create(productData);
            expect(product.tags).toEqual(productTags1);
        } catch (error) {
            expect(error.matcherResult.pass).toEqual(false);
        }
    });

    it("error on missing product variation", async () => {
        const productVariations1 = await ProductsVariation.create(variationData);
        const productData = {
            name: productName1,
            sellerId: productSellerId1,
            tags: productTags1,
            description: productDescription1,
        };

        try {
            const product = await Products.create(productData);
            expect(product.variation).toEqual(productVariations1);
        } catch (error) {
            expect(error.matcherResult.pass).toEqual(false);
        }
    });

    it("error on missing product description", async () => {
        const productVariations1 = await ProductsVariation.create(variationData);
        const productData = {
            name: productName1,
            sellerId: productSellerId1,
            tags: productTags1,
            variation: [productVariations1],
        };

        try {
            const product = await Products.create(productData);
            expect(product.description).toEqual(productDescription1);
        } catch (error) {
            expect(error.errors.description.kind).toEqual("required");
            expect(error.errors.description.path).toEqual("description");
        }
    });
});
