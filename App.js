import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from "@react-navigation/native";
import { BasketContext, UserProvider } from "./context/Context";
import StackNavigator from "./routes/StackNavigator.route";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <BasketContext>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
        <Toast />
      </UserProvider>
    </BasketContext>
  );
}
