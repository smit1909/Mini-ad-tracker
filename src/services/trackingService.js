const { v4: uuidv4 } = require('uuid');
const clickRepository = require('../repositories/clickRepository');
const logger = require('../utils/logger');

class TrackingService {
    async processClick(clickDTO) {
        const click_id = uuidv4();

        // Prepare Redirect URL
        const redirectUrl = new URL(clickDTO.lp);
        redirectUrl.searchParams.append('click_id', click_id);

        // Prepare entity data
        const clickData = {
            click_id,
            ...clickDTO
        };

        // Asynchronous save - we initiate it here but don't await strictly for the return value
        // However, to keep it clean, we can just call it and catch in background or return promise
        // In this architecture, let's trigger the save and log error if it fails, ensuring 
        // the main flow isn't blocked if we don't await. 
        // BUT, Node.js async/await usually blocks execution flow until resolved. 
        // To be "fire and forget" compatible, we can not await it, but we need to handle unhandled rejections.
        // Better approach: We return the redirectURL and the specific save promise if the controller wants it,
        // or just fire it here.

        this.saveClick(clickData).catch(err => {
            logger.error(`Failed to save click ${click_id}`, err);
        });

        return redirectUrl.toString();
    }

    async saveClick(clickData) {
        return await clickRepository.create(clickData);
    }
}

module.exports = new TrackingService();
