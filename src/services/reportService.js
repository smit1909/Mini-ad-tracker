const clickRepository = require('../repositories/clickRepository');

class ReportService {
    async getCampaignReport(source) {
        return await clickRepository.getReportData(source);
    }
}

module.exports = new ReportService();
