import { useState, useMemo } from 'react';
import { ExchangeRate } from '../api/cnb';

export const useCurrencyConverter = (currency: ExchangeRate) => {
    const [czkAmount, setCzkAmount] = useState('');

    const targetAmount = useMemo(() => {
        const amount = parseFloat(czkAmount);
        if (isNaN(amount)) {
            return null;
        }
        return amount / currency.normalizedRate;
    }, [czkAmount, currency.normalizedRate]);

    return {
        czkAmount,
        setCzkAmount,
        targetAmount,
    };
};
