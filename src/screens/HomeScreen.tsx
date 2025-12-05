import React, { useCallback } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import styled from 'styled-components/native';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { ExchangeRate } from '../api/cnb';
import { CurrencyList } from '../components/CurrencyList';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.textVariants.subhead.fontSize}px;
`;

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data: rates, isLoading, error } = useExchangeRates();

    const handlePress = useCallback((item: ExchangeRate) => {
        navigation.navigate('Converter', { currency: item });
    }, [navigation]);



    return (
        <Container>
            <CurrencyList
                rates={rates}
                onItemPress={handlePress}
                isLoading={isLoading}
                error={error}
            />
        </Container>
    );
};
