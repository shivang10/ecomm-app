const { Types } = require("mongoose");

const generateObjectId = (id) => new Types.ObjectId(id);

module.exports = generateObjectId;
