import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension'
import AppColors from '../../utills/AppColors';
const styles = StyleSheet.create({
  container: {
    height: height(8),
    width: width(100),
    alignItems: 'center',
    paddingHorizontal: width(4),
  },
  category: {
    color: AppColors.primary,
    fontWeight: 'bold',
    fontSize: width(5.5),
    textAlign: 'center'
  },
  optionContainer:{
    backgroundColor:'red',
    height: height(10)
  },
  icon: {
    height: height(4),
    width: height(4),
    resizeMode: 'contain',
    tintColor: AppColors.white50
  }
});
export default styles;
