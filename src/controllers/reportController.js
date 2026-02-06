const reportService = require('../services/reportService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/responseHandler');

exports.getReport = catchAsync(async (req, res, next) => {
    const { source } = req.query;

    const reportData = await reportService.getCampaignReport(source);

    sendResponse(res, 200, reportData, 'Report retrieved successfully');
});
