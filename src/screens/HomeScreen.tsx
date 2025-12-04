import React, { useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styled from 'styled-components/native';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { theme } from '../theme/theme';
import { ExchangeRate } from '../api/cnb';
import { CurrencyListItem } from '../components/CurrencyListItem';

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  font-size: ${theme.textVariants.subhead.fontSize}px;
`;

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data: rates, isLoading, error } = useExchangeRates();

    const handlePress = useCallback((item: ExchangeRate) => {
        navigation.navigate('Converter', { currency: item });
    }, [navigation]);

    const renderItem = useCallback(({ item }: { item: ExchangeRate }) => (
        <CurrencyListItem item={item} onPress={handlePress} />
    ), [handlePress]);

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

    const ratesList = rates ? Object.values(rates) : [];

    return (
        <Container>
            <FlatList
                data={ratesList}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                contentContainerStyle={{ padding: theme.spacing.m }}
                contentInsetAdjustmentBehavior="automatic"
            />
        </Container>
    );
};
