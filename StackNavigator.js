import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PizzaScreen from './screens/PizzaScreen';
import CartScreen from './screens/CartScreen';
import OrderData from './screens/OrderData';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import ForgotPassWord from './screens/ForgotPassword';
import OrderSuccess from './screens/OrderSuccess';
import AccountScreen from './screens/AccountScreen';
import OrdersScreen from './screens/OrdensScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Pizza" component={PizzaScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Order" component={OrderData} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />

        </Stack.Navigator>
    );
}

export default StackNavigator

const styles = StyleSheet.create({})