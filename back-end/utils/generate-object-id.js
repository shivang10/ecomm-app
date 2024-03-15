const { Types } = require("mongoose");
const apiResponse = require("./api-response");

const generateObjectId = (id) => {
    try {
        return new Types.ObjectId(id);
    } catch (error) {
        return apiResponse(error, "cannot convert to objectId");
    }
};

module.exports = generateObjectId;
