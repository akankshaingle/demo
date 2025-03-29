import {Image, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Images} from '../../assets/Images';
import {Colors} from '../../utils/Colors';

type Props = {
  title: string;
};

const CustomHeader = ({title}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={Images.arrow_left}
          style={styles.icon}
          tintColor={Colors.black}
          resizeMode="cover"
        />
      </View>
        <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
