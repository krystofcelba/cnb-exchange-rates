import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ConverterScreen } from '../screens/ConverterScreen';

import { ExchangeRate } from '../api/cnb';

export type RootStackParamList = {
    Home: undefined;
    Converter: { currency: ExchangeRate };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Exchange Rates',
                    headerLargeTitle: true,
                    headerLargeTitleEnabled: true,
                }}
            />
            <Stack.Screen name="Converter" component={ConverterScreen} />
        </Stack.Navigator>
    );
};
