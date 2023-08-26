/* eslint-disable no-undef */
/* eslint-disable no-return-await */
const dbHandler = require("../db-setup");
const UserReview = require("../../models/user-reviews");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const {
    userId, orderedProductId, ratingValue, ratingValueWrongValue, comment,
} = require("../dummy-data/user-review-dummy-data");

describe("user reviews schema ", () => {
    it("should successfully create review", async () => {
        const data = {
            userId, orderedProductId, ratingValue, comment,
        };
        const review = await UserReview.create(data);
        expect(review.userId).toEqual(userId);
        expect(review.orderedProductId).toEqual(orderedProductId);
        expect(review.ratingValue).toEqual(ratingValue);
        expect(review.comment).toEqual(comment);
    });

    it("error on missing user id", async () => {
        const data = {
            orderedProductId, ratingValue, comment,
        };

        try {
            const review = await UserReview.create(data);
            expect(review.userId).toEqual(userId);
        } catch (error) {
            expect(error.errors.userId.kind).toEqual("required");
            expect(error.errors.userId.path).toEqual("userId");
        }
    });

    it("error on missing ordered product id", async () => {
        const data = {
            userId, ratingValue, comment,
        };

        try {
            const review = await UserReview.create(data);
            expect(review.userId).toEqual(userId);
        } catch (error) {
            expect(error.errors.orderedProductId.kind).toEqual("required");
            expect(error.errors.orderedProductId.path).toEqual("orderedProductId");
        }
    });

    it("error on missing rating value", async () => {
        const data = {
            userId, orderedProductId, comment,
        };

        try {
            const review = await UserReview.create(data);
            expect(review.userId).toEqual(userId);
        } catch (error) {
            expect(error.errors.ratingValue.kind).toEqual("required");
            expect(error.errors.ratingValue.path).toEqual("ratingValue");
        }
    });

    it("error on wrong rating value", async () => {
        const data = {
            userId, orderedProductId, comment, ratingValue: ratingValueWrongValue,
        };

        try {
            const review = new UserReview(data);
            await review.validate();
            expect(review.userId).toEqual(userId);
        } catch (error) {
            expect(error.errors.ratingValue.kind).toEqual("max");
            expect(error.errors.ratingValue.path).toEqual("ratingValue");
        }
    });

    it("should pass on without comments", async () => {
        const data = {
            userId, ratingValue, orderedProductId,
        };

        const review = await UserReview.create(data);

        expect(review.comment).toEqual(undefined);
    });
});
