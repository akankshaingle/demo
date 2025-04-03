/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Constants} from '../../utils/Constants';
import {height, scale, width} from '../../utils/Scale';
import {Images} from '../../assets/Images';
import {Icons} from '../../assets/Svg';
import {Colors} from '../../utils/Colors';

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          source={Images.background}
          style={styles.bgIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>
          Lorem ipsum dolor sit amet consectetur. Lorem id sit{' '}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.innerButton}>
          <Text style={styles.buttonText}>Continue</Text>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.navigate(Constants.rLOGIN)}>
            <Icons.RightArrow />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: width * 0.07,
  },
  bgIcon: {
    position: 'absolute',
    width: width,
    height: height,
    top: -height * 0.2,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginHorizontal: width * 0.07,
    flex: 0.25,
    },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  arrowContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.darkGray,
    fontSize: scale(18),
    fontWeight: '800',
  },
  heading: {
    color: Colors.arsenic,
    fontSize: scale(40),
    fontWeight: '700',
  },
  subHeading: {
    color: Colors.lightGray,
    fontSize: scale(16),
    fontWeight: '600',
    marginTop: 15,
  },
});
