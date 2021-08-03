import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import Header from '../../components/Header'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import questions from './questions.json'
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    questions.map(question => {
      firestore().collection('Questions').add(question)
    })
  }, [])
  const logoutMethod = async () => {
    showMessage({
      message: 'Logged Out',
      description: 'Succfully logged out',
      type: 'danger',
    });
    dispatch(logout());
    auth().signOut()
  };
  return (
    <ScreenWrapper statusBarColor={AppColors.primary} barStyle="light-content"
      headerUnScrollable={() => <Header title="Quiz at werplay" logout onPressRight={logoutMethod} />}>
      <View style={styles.mainViewContainer}>
        <Text style={styles.text}>Dashboard</Text>
        <Text style={styles.text}>{user.userName}</Text>
        <Button title="Logout" onPress={logoutMethod} />
      </View>
    </ScreenWrapper>
  );
}
