import { useState, useMemo } from 'react';
import { ExchangeRate } from '../api/cnb';

export const useCurrencyConverter = (currency: ExchangeRate) => {
  const [czkAmount, setCzkAmount] = useState('');

  const sanitizeInput = (text: string) => text.replace(/,/g, '.').replace(/[\s\u00A0]/g, '');

  const handleAmountChange = (text: string) => {
    if (/^\d*\.?\d*$/.test(sanitizeInput(text))) {
      setCzkAmount(text);
    }
  };

  const targetAmount = useMemo(() => {
    if (!czkAmount) return null;

    const amountInCzk = parseFloat(sanitizeInput(czkAmount));

    if (isNaN(amountInCzk)) {
      return null;
    }

    return amountInCzk / currency.normalizedRate;
  }, [czkAmount, currency.normalizedRate]);

  return {
    czkAmount,
    setCzkAmount: handleAmountChange,
    targetAmount,
  };
};
