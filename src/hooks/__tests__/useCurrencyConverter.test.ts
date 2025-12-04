import { renderHook, act } from '@testing-library/react-native';
import { useCurrencyConverter } from '../useCurrencyConverter';
import { ExchangeRate } from '../../api/cnb';

const mockCurrency: ExchangeRate = {
    country: 'USA',
    currency: 'dollar',
    amount: 1,
    code: 'USD',
    rate: 20,
    normalizedRate: 20,
};

describe('useCurrencyConverter', () => {
    it('should initialize with empty czkAmount and null targetAmount', () => {
        const { result } = renderHook(() => useCurrencyConverter(mockCurrency));

        expect(result.current.czkAmount).toBe('');
        expect(result.current.targetAmount).toBeNull();
    });

    it('should calculate targetAmount correctly when czkAmount is valid', () => {
        const { result } = renderHook(() => useCurrencyConverter(mockCurrency));

        act(() => {
            result.current.setCzkAmount('40');
        });

        expect(result.current.czkAmount).toBe('40');
        expect(result.current.targetAmount).toBe(2); // 40 / 20 = 2
    });

    it('should return null targetAmount when czkAmount is invalid', () => {
        const { result } = renderHook(() => useCurrencyConverter(mockCurrency));

        act(() => {
            result.current.setCzkAmount('invalid');
        });

        expect(result.current.czkAmount).toBe('invalid');
        expect(result.current.targetAmount).toBeNull();
    });

    it('should handle different normalized rates', () => {
        const hungarianForint: ExchangeRate = {
            ...mockCurrency,
            amount: 100,
            rate: 6.5,
            normalizedRate: 0.065,
        };
        const { result } = renderHook(() => useCurrencyConverter(hungarianForint));

        act(() => {
            result.current.setCzkAmount('13');
        });

        expect(result.current.targetAmount).toBeCloseTo(200); // 13 / 0.065 = 200
    });
});
