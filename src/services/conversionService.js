const conversionRepository = require('../repositories/conversionRepository');
const logger = require('../utils/logger');
const AppError = require('../utils/AppError');

class ConversionService {
    async trackConversion(conversionDTO) {
        try {
            const conversion = await conversionRepository.create(conversionDTO);
            return conversion;
        } catch (error) {
            // Check for foreign key violation
            if (error.code === '23503') {
                throw new AppError('Invalid click_id not found.', 400);
            }
            throw new AppError('Internal Server Error', 500);
        }
    }
}

module.exports = new ConversionService();
