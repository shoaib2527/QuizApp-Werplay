import { StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white100
  },
  timer: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    paddingRight: width(5),
    color: AppColors.accent,
    fontWeight: 'bold',
    fontSize: totalSize(1.8)
  },
  text: {
    color: AppColors.white
  },
  loadingGif: {
    height: height(25),
    resizeMode: 'contain'
  },
  resultPercentage: {
    color: AppColors.accent,
    fontSize: totalSize(5),
    fontWeight: 'bold',
    marginBottom: height(5)
  },
  resultText: {
    color: AppColors.black100,
    fontSize: totalSize(2),
    fontWeight: 'bold',
    marginBottom: height(5),
    paddingHorizontal: width(10),
    letterSpacing:2
  }
});
export default styles;
