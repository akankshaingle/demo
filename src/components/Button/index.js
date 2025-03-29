import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {scale} from '../../utils/Scale';

const CustomButtom = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButtom;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors.cornflowerBlue,
    borderRadius: 8,
    padding: 10,
    // flex: 1,
    height: 40,

  },
  buttonText: {
    color: Colors.white,
    fontSize: scale(12),
    fontWeight: '500',
  },
});
