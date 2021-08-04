import {StyleSheet} from 'react-native';
import { height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:AppColors.white100
  },
  text:{
    color: AppColors.white
  },
  loadingGif:{
    height:height(25),
    resizeMode:'contain'
  }
});
export default styles;
