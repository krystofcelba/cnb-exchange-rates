import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { CurrencyList } from '../CurrencyList';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme/theme';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockRate = {
    country: 'USA',
    currency: 'USD',
    amount: 1,
    code: 'USD',
    rate: 22.5,
    normalizedRate: 22.5,
};

describe('CurrencyList', () => {
    it('renders rates correctly', () => {
        const mockOnItemPress = jest.fn();
        render(
            <Wrapper>
                <CurrencyList
                    rates={{ USD: mockRate }}
                    onItemPress={mockOnItemPress}
                />
            </Wrapper>
        );

        expect(screen.getAllByText(/USD/).length).toBeGreaterThan(0);
        expect(screen.getByText(/22.500 CZK/)).toBeTruthy();
    });

    it('renders loading state', () => {
        render(
            <Wrapper>
                <CurrencyList rates={undefined} onItemPress={jest.fn()} isLoading={true} />
            </Wrapper>
        );

        expect(screen.getByTestId('activity-indicator')).toBeTruthy();
    });

    it('renders error state', () => {
        render(
            <Wrapper>
                <CurrencyList
                    rates={undefined}
                    onItemPress={jest.fn()}
                    error={new Error('Failed')}
                />
            </Wrapper>
        );

        expect(screen.getByText('Error loading rates')).toBeTruthy();
    });

    it('triggers onRefresh when pulled', () => {
        const mockOnRefresh = jest.fn();
        render(
            <Wrapper>
                <CurrencyList
                    rates={{ USD: mockRate }}
                    onItemPress={jest.fn()}
                    onRefresh={mockOnRefresh}
                    refreshing={false}
                />
            </Wrapper>
        );

        const list = screen.getByTestId('flat-list');
        const refreshControl = list.props.refreshControl;

        refreshControl.props.onRefresh();
        expect(mockOnRefresh).toHaveBeenCalled();
    });

    it('triggers onRefresh when pulled in error state', () => {
        const mockOnRefresh = jest.fn();
        render(
            <Wrapper>
                <CurrencyList
                    rates={undefined}
                    onItemPress={jest.fn()}
                    error={new Error('Failed')}
                    onRefresh={mockOnRefresh}
                    refreshing={false}
                />
            </Wrapper>
        );

        const list = screen.getByTestId('flat-list');
        const refreshControl = list.props.refreshControl;

        refreshControl.props.onRefresh();
        expect(mockOnRefresh).toHaveBeenCalled();
    });
});
