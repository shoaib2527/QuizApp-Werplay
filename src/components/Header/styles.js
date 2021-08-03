import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension'
import AppColors from '../../utills/AppColors';
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: AppColors.primary,
    height: height(8),
    width: width(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: width(5),
    borderBottomRightRadius: width(5),
    paddingHorizontal: width(4),
  },
  headTitle: {
    color: AppColors.white100,
    fontWeight: 'bold',
    fontSize: width(5.5),
    width: width(70),
    textAlign: 'center'
  },
  leftContainer: {
    minWidth: width(10),
  },
  rightContainer: {
    minWidth: width(10),
    alignItems: 'flex-end'
  },
  icon: {
    height: height(4),
    width: height(4),
    resizeMode: 'contain',
    tintColor: AppColors.white50
  }
});
export default styles;
