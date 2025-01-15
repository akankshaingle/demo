import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Constants} from './src/utils/Constants';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Constants.HOME}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Constants.HOME} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;

