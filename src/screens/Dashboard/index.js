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
import Question from '../../components/Question'
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    // firestore().collection('Questions').add(question)
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
        <Question count = {'1'} item={{
          "category": "General Knowledge",
          "type": "multiple",
          "difficulty": "easy",
          "question": "Which company did Valve cooperate with in the creation of the Vive?",
          "correct_answer": "HTC",
          "incorrect_answers": [
            "Oculus",
            "Google",
            "Razer"
          ]
        }} />
        <Button title="Logout" onPress={logoutMethod} />
      </View>
    </ScreenWrapper>
  );
}
