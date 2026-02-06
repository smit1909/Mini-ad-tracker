const conversionService = require('../services/conversionService');
const CreateConversionDTO = require('../dtos/createConversionDTO');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/responseHandler');

exports.trackConversion = catchAsync(async (req, res, next) => {
    // DTO Validation
    const conversionDTO = CreateConversionDTO.validate(req.body);

    const result = await conversionService.trackConversion(conversionDTO);

    sendResponse(res, 201, { conversion: result }, 'Conversion tracked successfully');
});
