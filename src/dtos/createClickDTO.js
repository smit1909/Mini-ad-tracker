const { isValidUrl } = require('../utils/validationUtils');
const AppError = require('../utils/AppError');

class CreateClickDTO {
    constructor({ lp, source, campaign_id, ad_id, ip, user_agent }) {
        this.lp = lp;
        this.source = source || 'unknown';
        this.campaign_id = campaign_id;
        this.ad_id = ad_id;
        this.ip = ip;
        this.user_agent = user_agent;
    }

    static validate(data) {
        if (!data.lp) {
            throw new AppError('Landing page URL (lp) is required', 400);
        }
        if (!isValidUrl(data.lp)) {
            throw new AppError('Invalid landing page URL', 400);
        }
        // Additional sanitization if needed
        return new CreateClickDTO(data);
    }
}

module.exports = CreateClickDTO;
