/* eslint-disable no-undef */
const apiResponse = require("../../utils/api-response");

const message = "message";
const data = "data";

describe("tests for api response", () => {
    it("should return response with message and data", () => {
        const completeResult = {
            message, data,
        };

        const response = apiResponse(data, message);
        expect(response).toEqual(completeResult);
    });

    it("should return response with message only", () => {
        const messageResult = {
            message, data: null,
        };

        const response = apiResponse(null, message);
        expect(response).toEqual(messageResult);
    });

    it("should return response with data only", () => {
        const dataResult = {
            data, message: "",
        };

        const response = apiResponse(data);
        expect(response).toEqual(dataResult);
    });
});
