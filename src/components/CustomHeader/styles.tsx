import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {height, scale} from '../../utils/Scale';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cetaceanBlue,
    flexDirection: 'row',
    paddingTop: height * 0.08,
    paddingBottom: height * 0.02,
    paddingHorizontal: 15,
    alignItems:'center',
  },
  iconContainer: {
    backgroundColor: Colors.lavender,
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: scale(20),
    fontWeight: '600',
    color: Colors.white,
    paddingHorizontal:15,
  },
  icon: {
    height: 20,
    width: 20,
  },
  centerIcon: {
    height: 24,
    width: 24,
  },
});
