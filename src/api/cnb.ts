import axios from 'axios';

export interface ExchangeRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

const CNB_DAILY_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export const fetchExchangeRates = async (): Promise<Record<string, ExchangeRate>> => {
    try {
        const response = await axios.get(CNB_DAILY_URL);
        const data = response.data;

        const lines = data.trim().split('\n');
        // Skip the first two lines (date and header)
        const rateLines = lines.slice(2);

        return rateLines.reduce((acc: Record<string, ExchangeRate>, line: string) => {
            const [country, currency, amountStr, code, rateStr] = line.split('|');
            const amount = parseFloat(amountStr);
            const rate = parseFloat(rateStr);

            acc[code] = {
                country,
                currency,
                amount: 1,
                code,
                rate: rate / amount,
            };
            return acc;
        }, {});
    } catch (error) {
        console.error('Error fetching CNB rates:', error);
        throw error;
    }
};
