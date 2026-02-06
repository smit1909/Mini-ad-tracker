const sendResponse = (res, statusCode, data, message = 'Success') => {
    res.status(statusCode).json({
        status: `${statusCode}`.startsWith('2') ? 'success' : 'error',
        message,
        data
    });
};

module.exports = sendResponse;
