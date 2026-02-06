const isValidUrl = (string) => {
    try {
        const url = new URL(string);
        // Basic protection: only allow http/https
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
};

module.exports = {
    isValidUrl
};
