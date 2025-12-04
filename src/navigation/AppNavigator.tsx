import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ConverterScreen } from '../screens/ConverterScreen';

export type RootStackParamList = {
    Home: undefined;
    Converter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Converter" component={ConverterScreen} />
        </Stack.Navigator>
    );
};
