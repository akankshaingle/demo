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
      <Image
        source={Images.drawer}
        style={styles.icon}
        tintColor={Colors.black}
        resizeMode="cover"
      />
      <View style={styles.titleView}>
        <Image
          source={Images.plant}
          style={styles.centerIcon}
          tintColor={Colors.primary}
          resizeMode="cover"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image
        source={Images.shoppingCart}
        style={styles.icon}
        tintColor={Colors.black}
        resizeMode="cover"
      />
    </View>
  );
};

export default CustomHeader;
