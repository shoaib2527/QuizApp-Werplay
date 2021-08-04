import { StyleSheet } from 'react-native';
import { height } from 'react-native-dimension'
import AppColors from '../../utills/AppColors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppColors.white100
  },
  scroll: {
    flex: 1,
    paddingBottom: height(1.5),
    backgroundColor:AppColors.white100
  }
});
export default styles;
