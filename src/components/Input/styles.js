import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import Colors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: width(80),
    alignSelf: 'center',
    height: height(10)
  },
});
export default styles;
