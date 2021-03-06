import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { showMessage } from 'react-native-flash-message';
import { setLoaderVisible } from '../../Redux/Actions/Config';
import Input from '../../components/Input'
import CommonStyles from '../../utills/CommonStyles';
import { ValidateEmail } from '../../utills/Methods'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const [email, setEmail] = useState(__DEV__ ? 'shoaib.ahmed47564@gmail.com' : '')
  const [password, setPassword] = useState(__DEV__ ? '123qwe' : '')
  const [error, setError] = useState('')
  const [loginLoader, setLoginLoader] = useState(false)
  const dispatch = useDispatch();
  const loginMethod = () => {
    let emailValidation = ValidateEmail(email.trim())
    if (emailValidation.isValid) {
      if (password?.trim().length > 0) {
        setLoginLoader(true)
        auth()
          .signInWithEmailAndPassword(email.trim(), password.trim())
          .then(async r => {
            setLoginLoader(false)
            firestore().collection('Users').doc(r?.user?.uid).get()
              .then(r => {
                setEmail('');
                setPassword('');
                showMessage({
                  message: 'Success',
                  description: 'Succfully logged In',
                  type: 'success',
                });
                dispatch(login(r.data()))
              }).catch(err => {
                showMessage({
                  message: 'Error',
                  description: err?.message ?? 'Something went wrong.',
                  type: 'danger',
                });
              })

          })
          .catch(error => {
            console.log(error)
            setLoginLoader(false)
            if (error.code === 'auth/invalid-email') {
              showMessage({
                message: 'Error',
                description: 'That email address is invalid!',
                type: 'danger',
              });
            } else if (error.code === 'auth/user-disabled') {
              showMessage({
                message: 'Error',
                description: 'User is disabled!',
                type: 'danger',
              });
            } else if (error.code === 'auth/user-not-found') {
              showMessage({
                message: 'Error',
                description: 'User not found!',
                type: 'danger',
              });
            } else if (error.code === 'auth/wrong-password') {
              showMessage({
                message: 'Error',
                description: 'Incorrect Password!',
                type: 'danger',
              });
            } else {
              showMessage({
                message: 'Error',
                description: 'Something went wrong.',
                type: 'danger',
              });
            }
          });
      }
      else
        setError("Password can't empty.")
    }
    else
      setError(emailValidation.message)
  };
  const signup = () => props.navigation.replace('SignUp')
  return (
    <ScreenWrapper statusBarColor={AppColors.black25} barStyle='light-content' scrollEnabled={true}>
      <View style={styles.mainViewContainer}>
        <Animatable.Image animation={"fadeInUp"} source={{ uri: 'https://www.werplay.com/rsrc/images/temp.png' }} style={styles.logo} />
        <Animatable.View style={styles.formContainer} animation={"zoomInUp"}>
          <Text style={styles.heading}>Login</Text>
          <Input label='Email' value={email} onChangeText={setEmail} />
          <Input label='Password' value={password} onChangeText={setPassword} />
          <Text style={CommonStyles.errorText}>{error}</Text>
          <Button title="Login" onPress={loginMethod} isLoading={loginLoader} />
          <Text style={styles.dontHaveAccount}>
            Don't have an account?
            <Text onPress={signup} style={styles.signUp}>
              {' Signup'}
            </Text>
          </Text>
        </Animatable.View>
      </View>
    </ScreenWrapper>
  );
}
