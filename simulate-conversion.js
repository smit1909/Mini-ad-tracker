const axios = require('axios'); // We need to install axios or use fetch

// Check if click_id is provided
const clickId = process.argv[2];

if (!clickId) {
    console.error('Please provide a click_id.');
    console.error('Usage: node test-conversion.js <click_id>');
    process.exit(1);
}

const payload = {
    click_id: clickId,
    event: 'purchase',
    value: 49.99,
    currency: 'USD'
};

const trackConversion = async () => {
    try {
        // Use native fetch (available in Node 18+)
        const response = await fetch('http://localhost:3001/conversion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Server responded with ${response.status}: ${errText}`);
        }

        const data = await response.json();
        console.log('Conversion tracked successfully!');
        console.log('Response:', data);
    } catch (error) {
        console.error('Failed to track conversion:', error.message);
    }
};

trackConversion();
