import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator"; 

import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import ForgotPassWord from "../screens/ForgotPassword";
import OrderData from "../screens/OrderData";
import OrderSuccess from "../screens/OrderSuccess";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />

      {/* Quando logar vai entrar no Drawer */}
      <Stack.Screen name="Main" component={DrawerNavigator} />

      {/* Telas fora do menu */}
      <Stack.Screen name="Order" component={OrderData} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
    </Stack.Navigator>
  );
}
