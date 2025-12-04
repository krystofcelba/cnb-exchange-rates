
import axios from 'axios';
import { fetchExchangeRates, ExchangeRate } from '../cnb';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchExchangeRates', () => {
    it('should fetch and parse exchange rates correctly', async () => {
        const mockData = `04 Dec 2025 #235
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|13.680
Brazil|real|1|BRL|3.906
Bulgaria|lev|1|BGN|12.356
Canada|dollar|1|CAD|14.820
China|renminbi|1|CNY|2.928
Denmark|krone|1|DKK|3.234
EMU|euro|1|EUR|24.155
Hongkong|dollar|1|HKD|2.661
Hungary|forint|100|HUF|6.324
Iceland|krona|100|ISK|16.211
`;
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const rates = await fetchExchangeRates();

        expect(Object.keys(rates)).toHaveLength(10);

        expect(rates['AUD']).toEqual({
            country: 'Australia',
            currency: 'dollar',
            amount: 1,
            code: 'AUD',
            rate: 13.680,
        });

        expect(rates['HUF']).toEqual({
            country: 'Hungary',
            currency: 'forint',
            amount: 1,
            code: 'HUF',
            rate: 0.06324,
        });
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchExchangeRates()).rejects.toThrow(errorMessage);
    });
});
