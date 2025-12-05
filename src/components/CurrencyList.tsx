import React, { useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { ExchangeRate } from '../api/cnb';
import { CurrencyListItem } from './CurrencyListItem';

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.m}px;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.textVariants.subhead.fontSize}px;
  text-align: center;
`;

interface CurrencyListProps {
    rates: Record<string, ExchangeRate> | undefined;
    onItemPress: (item: ExchangeRate) => void;
    isLoading?: boolean;
    error?: Error | null;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const CurrencyList: React.FC<CurrencyListProps> = ({
    rates,
    onItemPress,
    isLoading,
    error,
    contentContainerStyle,
}) => {
    const theme = useTheme();
    const ratesList = useMemo(() => (rates ? Object.values(rates) : []), [rates]);

    const renderItem = useCallback(
        ({ item }: { item: ExchangeRate }) => (
            <CurrencyListItem item={item} onPress={onItemPress} />
        ),
        [onItemPress]
    );

    if (isLoading) {
        return (
            <Centered>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </Centered>
        );
    }

    if (error) {
        return (
            <Centered>
                <ErrorText>Error loading rates</ErrorText>
            </Centered>
        );
    }

    return (
        <FlatList
            data={ratesList}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
            contentContainerStyle={contentContainerStyle || { padding: theme.spacing.m }}
            contentInsetAdjustmentBehavior="automatic"
        />
    );
};
