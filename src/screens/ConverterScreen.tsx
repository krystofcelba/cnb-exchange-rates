import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

export const ConverterScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Converter'>>();
    const { currency } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Converter: {currency.code}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});
