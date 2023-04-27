const apiResponse = (data = {}, message = "") => {
    return {
        message, data
    };
};

module.exports = apiResponse;