/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Images} from '../../assets/Images';
import {height, scale, width} from '../../utils/Scale';
import {Colors} from '../../utils/Colors';
import Strings from '../../utils/Strings';
import {Constants} from '../../utils/Constants';
import {Icons} from '../../assets/Svg';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID} from '@env';

const Login = ({navigation}) => {
  const [formValues, setFormValues] = React.useState({
    email: 'demo@gmail.com',
    password: '',
    rememberMe: true,
  });

  const handleLogin = () => {
    GoogleSignin.configure({
      // androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
      iosClientId: IOS_CLIENT_ID,
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              Alert.alert(
                'Success',
                `${
                  'Successfully logged in as: ' + userInfo?.data?.user?.email
                }`,
              );
              console.log(JSON.stringify(userInfo));
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };
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
        <View style={{flexDirection: 'row'}}>
          <View style={styles.signInHeader}>
            <Text style={styles.heading}>{`${Strings.lableSign} `}</Text>
          </View>
          <Text style={styles.heading}>{Strings.lableIn}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>{Strings.lableEmail}</Text>
          <View
            style={[
              styles.inputContainer,
              formValues.email && {borderColor: Colors.primary},
            ]}>
            {formValues.email ? <Icons.Email /> : <Icons.LightEmail />}
            <TextInput
              value={formValues.email}
              placeholder={Strings.lableEnterEmail}
              placeholderTextColor={Colors.lightGray}
              onChange={newValue => {
                setFormValues({...formValues, email: newValue});
              }}
              style={styles.inputText}
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>{Strings.lablePassword}</Text>
          <View
            style={[
              styles.inputContainer,
              formValues.password && {borderColor: Colors.primary},
            ]}>
            {formValues.password ? <Icons.Password /> : <Icons.LightPassword />}
            <TextInput
              value={formValues.password}
              placeholder={Strings.lableEnterPassword}
              placeholderTextColor={Colors.lightGray}
              onChange={() => {
                setFormValues({
                  ...formValues,
                  password: formValues.password,
                });
              }}
              style={styles.inputText}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              onPress={() => {
                formValues.rememberMe = !formValues.rememberMe;
                setFormValues({...formValues});
              }}>
              {formValues.rememberMe ? (
                <Icons.CheckboxFilled />
              ) : (
                <Icons.CheckboxUnfilled />
              )}
            </TouchableOpacity>
            <Text style={styles.rememberMe}>{Strings.lableRememberMe}</Text>
          </View>
          <Text style={styles.forgotPass}>{Strings.lableForgotPassword}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonConatiner}>
        <Text style={styles.buttonText}>{Strings.lableLogin}</Text>
      </TouchableOpacity>

      <Text style={styles.or}>{Strings.lableContinueWith}</Text>

      <TouchableOpacity onPress={handleLogin} style={styles.buttonConatiner2}>
        <Icons.Google width={25} height={25} />
        <Text style={styles.buttonText2}>{Strings.lableGoogle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(Constants.rSIGNUP)}
        style={styles.footer}>
        <Text style={styles.dontHaveAccount}>
          {Strings.lableDontHaveAccount}
          <Text style={styles.signup}>{` ${Strings.lableSignUp}`}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
    margin: width * 0.07,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bgIcon: {
    position: 'absolute',
    width: width,
    height: height,
    top: -height * 0.32,
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
  buttonConatiner: {
    backgroundColor: Colors.primary,
    marginHorizontal: width * 0.07,
    borderRadius: 12,
    marginVertical: 15,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  or: {
    alignSelf: 'center',
    color: Colors.darkGray,
  },
  buttonConatiner2: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: 50,
    marginHorizontal: width * 0.07,
  },
  buttonText: {
    fontSize: scale(18),
    fontWeight: '700',
    color: Colors.white,
    alignSelf: 'center',
  },
  buttonText2: {
    fontSize: scale(18),
    fontWeight: '700',
    color: Colors.primary,
    alignSelf: 'center',
  },
  footer: {
    alignSelf: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.005,
  },
  dontHaveAccount: {
    color: Colors.darkGray,
    fontSize: scale(14),
    fontWeight: '600',
  },
  signup: {
    color: Colors.primary,
    fontSize: scale(16),
    fontWeight: '700',
  },
  inputBox: {
    marginTop: height * 0.03,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: Colors.darkGray,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    gap: 5,
    alignItems: 'center',
  },
  inputText: {
    fontSize: scale(16),
  },
  forgotPass: {
    fontSize: scale(14),
    color: Colors.primary,
    fontWeight: '700',
  },
  rememberMe: {
    fontSize: scale(14),
    color: Colors.arsenic,
    fontWeight: '700',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: scale(16),
    color: Colors.arsenic,
    fontWeight: '600',
  },
  signInHeader: {
    borderBottomWidth: 3,
    borderColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingBottom: 5,
  },
});
