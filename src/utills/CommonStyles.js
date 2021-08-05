import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../utills/AppColors';

const CommonStyles = StyleSheet.create({
    errorText: {
        color: AppColors.red,
        fontSize: width(3),
        width: '87%'
    },
});
export default CommonStyles;