const trackingService = require('../services/trackingService');
const CreateClickDTO = require('../dtos/createClickDTO');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

exports.trackClick = catchAsync(async (req, res, next) => {
    const { lp, source, campaign_id, ad_id } = req.query;

    // IP and User Agent extraction
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const user_agent = req.headers['user-agent'];

    // DTO Validation
    const clickDTO = CreateClickDTO.validate({
        lp,
        source,
        campaign_id,
        ad_id,
        ip,
        user_agent
    });

    const redirectUrl = await trackingService.processClick(clickDTO);

    // Redirect
    res.redirect(302, redirectUrl);
});
