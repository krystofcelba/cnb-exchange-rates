import { fetchExchangeRates } from '../src/api/cnb';

const verify = async () => {
    try {
        console.log('Fetching CNB rates...');
        const rates = await fetchExchangeRates();
        console.log('Fetched rates:', rates);

        const keys = Object.keys(rates);
        if (keys.length > 0) {
            console.log('Successfully fetched and parsed rates.');
            console.log('First rate (AUD):', rates['AUD']);
        } else {
            console.log('No rates found.');
        }

    } catch (error) {
        console.error('Verification failed:', error);
    }
};

verify();
