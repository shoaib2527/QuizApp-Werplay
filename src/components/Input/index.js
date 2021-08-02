import React from 'react';
import { width } from 'react-native-dimension';
import {
  OutlinedTextField
} from 'rn-material-ui-textfield';
import styles from './styles';

const Input = ({ label, keyboardType, value = "?", onChangeText = () => { } }) => {
  return (
    <OutlinedTextField
      label={label ?? 'Input'}
      keyboardType={keyboardType ?? 'default'}
      containerStyle={styles.container}
      onChangeText={onChangeText}
      fontSize = {width(3)}
      labelFontSize = {width(2.5)}
      value = {value}
    />)
};

export default Input;
