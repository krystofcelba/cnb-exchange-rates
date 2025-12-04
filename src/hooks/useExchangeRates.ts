import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates, ExchangeRate } from '../api/cnb';

export const useExchangeRates = () => {
    return useQuery<Record<string, ExchangeRate>, Error>({
        queryKey: ['exchangeRates'],
        queryFn: fetchExchangeRates,
    });
};
