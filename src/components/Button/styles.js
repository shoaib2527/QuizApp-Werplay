import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: AppColors.accent,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: AppColors.white100,
    fontSize: 20,
  }
});
export default styles;
