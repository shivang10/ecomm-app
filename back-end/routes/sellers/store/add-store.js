const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const StoreSchema = require("../../../models/store");
const generateObjectId = require("../../../utils/generate-object-id");

router.post("/:id", validateSellerToken, async (req, res) => {
    const sellerId = generateObjectId(req.params.id);
    const { name, address } = req.body;
    if (!name || !sellerId || !address) {
        return res.status(400).send(apiResponse(null, "All fields are required."));
    }
    try {
        const storeInfo = { name, sellerId, address };
        const response = await StoreSchema.create(storeInfo);
        return res.status(200).send(apiResponse(response, "Store is successfully added."));
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."));
    }
});

module.exports = router;
