import {Dimensions, PixelRatio} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

const scaleFont = size => size * PixelRatio.getFontScale();
export const scale = size => scaleFont(size);
