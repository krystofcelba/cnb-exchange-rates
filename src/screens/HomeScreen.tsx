import React, { useCallback } from 'react';

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

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: rates, isLoading, error } = useExchangeRates();

  const handlePress = useCallback(
    (item: ExchangeRate) => {
      navigation.navigate('Converter', { currency: item });
    },
    [navigation],
  );

  return (
    <Container>
      <CurrencyList rates={rates} onItemPress={handlePress} isLoading={isLoading} error={error} />
    </Container>
  );
};
