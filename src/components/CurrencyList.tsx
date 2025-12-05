import React, { useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator, StyleProp, ViewStyle, RefreshControl } from 'react-native';
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
    onRefresh?: () => void;
    refreshing?: boolean;
}

export const CurrencyList: React.FC<CurrencyListProps> = ({
    rates,
    onItemPress,
    isLoading,
    error,
    contentContainerStyle,
    onRefresh,
    refreshing,
}) => {
    const theme = useTheme();
    const ratesList = useMemo(() => (rates ? Object.values(rates) : []), [rates]);

    const renderItem = useCallback(
        ({ item }: { item: ExchangeRate }) => <CurrencyListItem item={item} onPress={onItemPress} />,
        [onItemPress],
    );

    const ListEmptyComponent = useMemo(() => {
        if (isLoading && !refreshing) {
            return (
                <Centered>
                    <ActivityIndicator testID="activity-indicator" size="large" color={theme.colors.primary} />
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
        return null;
    }, [isLoading, refreshing, error, theme.colors.primary]);

    return (
        <FlatList
            testID="flat-list"
            data={ratesList}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
            contentContainerStyle={[
                { padding: theme.spacing.m, flexGrow: 1 },
                contentContainerStyle,
                (isLoading || error) && { justifyContent: 'center' },
            ]}
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={<RefreshControl refreshing={refreshing || false} onRefresh={onRefresh} />}
            ListEmptyComponent={ListEmptyComponent}
        />
    );
};
