import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {scale, width} from '../../utils/Scale';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    width:width*0.8,
  },
  title: {
    fontSize: scale(24),
    fontWeight: '500',
    color: Colors.black,
    marginHorizontal: 8,
  },
  icon: {
    height: 18,
    width: 18,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerIcon: {
    height: 24,
    width: 24,
  },
});
