import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const Button = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white100,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle, {backgroundColor: disabled ? AppColors.grey75: AppColors.accent}]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size={25} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
