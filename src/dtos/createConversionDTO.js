const AppError = require('../utils/AppError');

class CreateConversionDTO {
    constructor({ click_id, event, value, currency }) {
        this.click_id = click_id;
        this.event = event;
        this.value = value || 0;
        this.currency = currency || 'USD';
    }

    static validate(data) {
        if (!data.click_id) {
            throw new AppError('click_id is required', 400);
        }
        if (!data.event) {
            throw new AppError('event is required', 400);
        }
        // Value validation
        if (data.value && isNaN(data.value)) {
            throw new AppError('value must be a number', 400);
        }
        return new CreateConversionDTO(data);
    }
}

module.exports = CreateConversionDTO;
