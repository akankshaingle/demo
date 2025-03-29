import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Constants} from '../../utils/Constants';
import {Icons} from '../../assets/Svg';

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Landing</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Constants.rLOGIN)}>
        <Text style={styles.buttonText}>Go to Login</Text>
        <Icons.RightArrow />
      </TouchableOpacity>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
  },
});
