import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import styled from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ScrollContent = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
})`
  padding: ${({ theme }) => theme.spacing.l}px;
`;

const ConversionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
  width: 100%;
`;

const Section = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.s}px;
  font-weight: 600;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#E0E0E0'};
  padding-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.xxl}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
`;

const Suffix = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.s}px;
`;

const ResultAmount = styled.Text`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 56px;
`;

const ResultCurrencyCode = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const ResultCurrencyName = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const RatePill = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding-vertical: ${({ theme }) => theme.spacing.s}px;
  padding-horizontal: ${({ theme }) => theme.spacing.m}px;
  border-radius: 12px;
  align-self: center;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border || '#f0f0f0'};
`;

const RateText = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;


export const ConverterScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Converter'>>();
    const { currency } = route.params;
    const { czkAmount, setCzkAmount, targetAmount } = useCurrencyConverter(currency);

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >
                    <ScrollContent>
                        <ConversionCard>
                            <Section>
                                <Label>You convert</Label>
                                <InputWrapper>
                                    <Input
                                        value={czkAmount}
                                        onChangeText={setCzkAmount}
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor="#D1D5DB"
                                        autoFocus
                                        selectionColor={currency.code === 'USD' ? '#000' : undefined}
                                    />
                                    <Suffix>CZK</Suffix>
                                </InputWrapper>
                            </Section>

                            <RatePill>
                                <RateText>
                                    Current Rate: {currency.amount} {currency.code} = {currency.rate.toFixed(3)} CZK
                                </RateText>
                            </RatePill>

                            <Section style={{ marginBottom: 0 }}>
                                <Label>You get</Label>
                                <ResultAmount numberOfLines={1} adjustsFontSizeToFit>
                                    {targetAmount !== null
                                        ? targetAmount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })
                                        : '0.00'}
                                </ResultAmount>
                                <ResultCurrencyCode>{currency.code}</ResultCurrencyCode>
                                <ResultCurrencyName>{currency.currency}</ResultCurrencyName>
                            </Section>
                        </ConversionCard>
                    </ScrollContent>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Container>
    );
};