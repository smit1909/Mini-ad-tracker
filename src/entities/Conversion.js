class Conversion {
    constructor({ id, click_id, event, value, currency, created_at }) {
        this.id = id;
        this.click_id = click_id;
        this.event = event;
        this.value = value;
        this.currency = currency;
        this.created_at = created_at;
    }
}

module.exports = Conversion;
