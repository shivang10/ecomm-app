/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const dbHandler = require("../db-setup");
const ItemOrder = require("../../models/item-order");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    itemOrderQuantityWrong,
    itemOrderProductId,
    itemOrderDiscount,
    itemOrderDiscountWrong,
    itemOrderQuantity,
    itemOrderTotalPrice,
    itemOrderPriceWrong,
    itemOrderPrice,
    itemOrderSellerId,
    itemOrderStatus,
    itemOrderPriceAfterDiscount,
} = require("../dummy-data/item-order-dummy-data");

describe("item order schema", () => {
    it("should successfully create item", async () => {
        const data = {
            price: itemOrderPrice,
            quantity: itemOrderQuantity,
            totalPrice: itemOrderTotalPrice,
            productId: itemOrderProductId,
            productDiscount: itemOrderDiscount,
            sellerId: itemOrderSellerId,
            orderStatus: itemOrderStatus,
            priceAfterDiscount: itemOrderPriceAfterDiscount,
            priceBeforeDiscount: itemOrderPrice,
        };
        const itemOrder = await ItemOrder.create(data);
        expect(itemOrder.price).toEqual(itemOrderPrice);
    });

    it("error on missing price", async () => {
        const data = {
            quantity: itemOrderQuantity,
            totalPrice: itemOrderTotalPrice,
            productId: itemOrderProductId,
            productDiscount: itemOrderDiscount,
        };

        try {
            const itemOrder = await ItemOrder.create(data);
            expect(itemOrder.price).toEqual(itemOrderPrice);
        } catch (error) {
            expect(error.errors.price.kind).toEqual("required");
            expect(error.errors.price.path).toEqual("price");
        }
    });

    it("error on missing quantity", async () => {
        const data = {
            price: itemOrderPrice,
            totalPrice: itemOrderTotalPrice,
            productId: itemOrderProductId,
            productDiscount: itemOrderDiscount,
        };

        try {
            const itemOrder = await ItemOrder.create(data);
            expect(itemOrder.quantity).toEqual(itemOrderQuantity);
        } catch (error) {
            expect(error.errors.quantity.kind).toEqual("required");
            expect(error.errors.quantity.path).toEqual("quantity");
        }
    });

    it("error on missing product id", async () => {
        const data = {
            price: itemOrderPrice,
            quantity: itemOrderQuantity,
            totalPrice: itemOrderTotalPrice,
            productDiscount: itemOrderDiscount,
        };

        try {
            const itemOrder = await ItemOrder.create(data);
            expect(itemOrder.productId).toEqual(itemOrderProductId);
        } catch (error) {
            expect(error.errors.productId.kind).toEqual("required");
            expect(error.errors.productId.path).toEqual("productId");
        }
    });

    it("error on wrong price item", async () => {
        const data = {
            price: itemOrderPriceWrong,
            quantity: itemOrderQuantity,
            totalPrice: itemOrderTotalPrice,
            productDiscount: itemOrderDiscount,
            productId: itemOrderProductId,
        };

        try {
            const itemOrder = await ItemOrder.create(data);
            expect(itemOrder.price).toEqual(itemOrderPriceWrong);
        } catch (error) {
            expect(error.errors.price.kind).toEqual("min");
            expect(error.errors.price.path).toEqual("price");
        }
    });

    it("error on wrong item discount", async () => {
        const data = {
            price: itemOrderPrice,
            quantity: itemOrderQuantityWrong,
            totalPrice: itemOrderTotalPrice,
            productDiscount: itemOrderDiscountWrong,
            productId: itemOrderProductId,
        };

        try {
            const itemOrder = await ItemOrder.create(data);
            expect(itemOrder.productDiscount).toEqual(itemOrderProductId);
        } catch (error) {
            expect(error.errors.productDiscount.kind).toEqual("min");
            expect(error.errors.productDiscount.path).toEqual("productDiscount");
        }
    });

    it("error on wrong item quantity", async () => {
        const data = {
            price: itemOrderPrice,
            quantity: itemOrderQuantityWrong,
            totalPrice: itemOrderTotalPrice,
            productDiscount: itemOrderDiscount,
            productId: itemOrderProductId,
        };

        try {
            const itemOrder = await ItemOrder.create(data);
            expect(itemOrder.quantity).toEqual(itemOrderProductId);
        } catch (error) {
            expect(error.errors.quantity.kind).toEqual("min");
            expect(error.errors.quantity.path).toEqual("quantity");
        }
    });
});
