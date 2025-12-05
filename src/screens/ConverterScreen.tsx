import React from 'react';
import { TouchableWithoutFeedback, Keyboard, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { CurrencyList } from '../components/CurrencyList';
import { ExchangeRate } from '../api/cnb';

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

const PickerTrigger = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.s}px;
  background-color: #f2f2f7;
  padding-vertical: ${({ theme }) => theme.spacing.s}px;
  padding-horizontal: ${({ theme }) => theme.spacing.m}px;
  border-radius: 20px;
  align-self: flex-start;
`;

const Chevron = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
  font-weight: 700;
`;

const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ModalHeader = styled.View`
  padding: ${({ theme }) => theme.spacing.m}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#f0f0f0'};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing.s}px;
`;

const CloseButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const LastSection = styled(Section)`
  margin-bottom: 0;
`;

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

export const ConverterScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Converter'>>();
  const [selectedCurrency, setSelectedCurrency] = React.useState<ExchangeRate>(
    route.params.currency,
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const { data: rates } = useExchangeRates();
  const theme = useTheme();

  const { czkAmount, setCzkAmount, targetAmount } = useCurrencyConverter(selectedCurrency);

  const handleSelectCurrency = (item: ExchangeRate) => {
    setSelectedCurrency(item);
    setModalVisible(false);
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledKeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollContent>
            <ConversionCard>
              <Section>
                <Label>You convert</Label>
                <InputWrapper>
                  <Input
                    value={czkAmount}
                    onChangeText={setCzkAmount}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={theme.colors.border}
                    autoFocus
                  />
                  <Suffix>CZK</Suffix>
                </InputWrapper>
              </Section>

              <RatePill>
                <RateText>
                  Current Rate: {selectedCurrency.amount} {selectedCurrency.code} ={' '}
                  {selectedCurrency.rate.toFixed(3)} CZK
                </RateText>
              </RatePill>

              <LastSection>
                <Label>You get</Label>
                <ResultAmount numberOfLines={1} adjustsFontSizeToFit>
                  {targetAmount !== null
                    ? targetAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : '0.00'}
                </ResultAmount>
                <PickerTrigger onPress={() => setModalVisible(true)}>
                  <ResultCurrencyCode>{selectedCurrency.code}</ResultCurrencyCode>
                  <Chevron>▼</Chevron>
                </PickerTrigger>
                <ResultCurrencyName>{selectedCurrency.currency}</ResultCurrencyName>
              </LastSection>
            </ConversionCard>
          </ScrollContent>

          <Modal
            animationType="slide"
            visible={modalVisible}
            presentationStyle="pageSheet"
            onRequestClose={() => setModalVisible(false)}
          >
            <ModalContainer>
              <StyledSafeAreaView>
                <ModalHeader>
                  <HeaderTitle>Select Currency</HeaderTitle>
                  <CloseButton onPress={() => setModalVisible(false)}>
                    <CloseButtonText>Close</CloseButtonText>
                  </CloseButton>
                </ModalHeader>
                <CurrencyList
                  rates={rates}
                  onItemPress={handleSelectCurrency}
                  contentContainerStyle={{ padding: theme.spacing.m }}
                />
              </StyledSafeAreaView>
            </ModalContainer>
          </Modal>
        </StyledKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
