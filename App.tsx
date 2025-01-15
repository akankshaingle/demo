import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Constants} from './src/utils/Constants';
import Home from './src/screens/Home';
import { CartProvider } from './src/context/CartContext';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Constants.HOME}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Constants.HOME} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
export default App;

