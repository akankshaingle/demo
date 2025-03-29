import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Constants} from '../utils/Constants';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Landing from '../screens/Landing';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Constants.rSPLASH}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Constants.rSPLASH} component={Splash} />
        <Stack.Screen name={Constants.rLANDING} component={Landing} />
        <Stack.Screen name={Constants.rLOGIN} component={Login} />
        <Stack.Screen name={Constants.rHOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
