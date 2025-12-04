import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import PizzaScreen from "../screens/PizzaScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import OrdersScreen from "../screens/OrdersScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#740005" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#740005",
        drawerInactiveTintColor: "#333",
        drawerStyle: { backgroundColor: "#f0f0f0" }
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Cardápio" component={PizzaScreen} />
      <Drawer.Screen name="Carrinho" component={CartScreen} />
      <Drawer.Screen name="Minha Conta" component={AccountScreen} />
      <Drawer.Screen name="Meus Pedidos" component={OrdersScreen} />
    </Drawer.Navigator>
  );
}
