import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import Logout from '../../assets/images/logout.png'
const Component = ({ title, onPressRight, logout, containerStyle }) => {
  return (<View style={[styles.headerContainer, containerStyle ? containerStyle : null]}>
    <View style={styles.leftContainer}>
    </View>
    <Text style={styles.headTitle}>{title}</Text>
    <TouchableOpacity style={styles.rightContainer} onPress = {onPressRight}>
      <Image source = {Logout} style = {styles.icon} />
    </TouchableOpacity>
  </View>)
};

export default Component;
