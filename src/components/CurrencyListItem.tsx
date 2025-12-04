import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ExchangeRate } from '../api/cnb';
import { theme } from '../theme/theme';

const ItemContainer = styled.View`
  padding-vertical: ${theme.spacing.s}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xs}px;
`;

const CurrencyCode = styled.Text`
  font-size: ${theme.textVariants.subhead.fontSize}px;
  font-weight: ${theme.textVariants.subhead.fontWeight};
  color: ${theme.colors.text};
`;

const Rate = styled.Text`
  font-size: ${theme.textVariants.subhead.fontSize}px;
  font-weight: ${theme.textVariants.subhead.fontWeight};
  color: ${theme.colors.primary};
`;

const Country = styled.Text`
  font-size: ${theme.textVariants.caption.fontSize}px;
  color: ${theme.colors.textSecondary};
`;

interface CurrencyListItemProps {
    item: ExchangeRate;
    onPress: (item: ExchangeRate) => void;
}

export const CurrencyListItem = memo(({ item, onPress }: CurrencyListItemProps) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)}>
            <ItemContainer>
                <Row>
                    <CurrencyCode>{item.amount} {item.code}</CurrencyCode>
                    <Rate>{item.rate.toFixed(3)} CZK</Rate>
                </Row>
                <Country>{item.country} - {item.currency}</Country>
            </ItemContainer>
        </TouchableOpacity>
    );
});
