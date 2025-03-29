import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Constants} from '../../utils/Constants';
import {scale} from '../../utils/Scale';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate(Constants.rLANDING);
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Demo</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: scale(25),
    fontWeight: '800',
  },
});
