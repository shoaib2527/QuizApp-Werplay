import { StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension'
import AppColors from '../../utills/AppColors';
const styles = StyleSheet.create({
  container: {
    width: width(100),
    alignItems: 'center',
    paddingHorizontal: width(4),
  },
  category: {
    color: AppColors.primary,
    fontWeight: 'bold',
    fontSize: width(5.5),
    textAlign: 'center',
    marginBottom:height(3)
  },
  questionText:{
    color: AppColors.black75,
    fontWeight: 'bold',
    fontSize: totalSize(2),
    lineHeight: totalSize(3),
    letterSpacing: width(0.2),
    textAlign:'left',
    width:width(90)
  },
  optionText:{
    color: AppColors.black75,
    fontWeight: 'bold',
    fontSize: totalSize(2),
    letterSpacing: width(0.4),
  },
  flatList: {
    marginTop:height(5),
    height: height(50)
  },
  optionContainer: {
    flexDirection: 'row',
    width: width(80),
    alignItems:'center',
    marginVertical: height(2)
  },
  icon: {
    height: height(4),
    width: height(4),
    resizeMode: 'contain',
    marginRight: width(5)
  }
});
export default styles;
