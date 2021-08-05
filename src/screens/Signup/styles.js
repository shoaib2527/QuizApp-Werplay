import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.black25
  },
  formContainer: {
    backgroundColor: AppColors.white100,
    width: '90%',
    alignItems: 'center',
    paddingVertical: height(3),
    borderRadius: 5
  },
  logo: {
    height: height(12),
    width:'100%',
    resizeMode: 'contain',
    marginVertical: height(5)
  },
  heading: {
    fontSize: width(8),
    color: AppColors.accent,
    fontWeight: 'bold',
    marginBottom: height(2)
  },
  haveAccount:{
    fontStyle: 'italic',
    fontSize: width(4),
    marginTop: height(3)
  },
  login:{
    color: AppColors.accent,
  }
});
export default styles;
