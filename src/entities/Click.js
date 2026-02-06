class Click {
    constructor({ click_id, source, campaign_id, ad_id, ip, user_agent, created_at }) {
        this.click_id = click_id;
        this.source = source;
        this.campaign_id = campaign_id;
        this.ad_id = ad_id;
        this.ip = ip;
        this.user_agent = user_agent;
        this.created_at = created_at;
    }
}

module.exports = Click;
