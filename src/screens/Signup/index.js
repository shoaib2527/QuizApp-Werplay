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
import { ValidateEmail } from '../../utills/Methods'
import Input from '../../components/Input'
import CommonStyles from '../../utills/CommonStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import * as Animatable from 'react-native-animatable';
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [signUpLoader, setSignUpLoader] = useState(false)

  const dispatch = useDispatch();
  const signUp = () => {
    let emailValidation = ValidateEmail(email.trim())
    if (emailValidation.isValid) {
      if (userName?.trim().length > 0) {
        if (password?.trim().length > 0) {
          setSignUpLoader(true)
          auth()
            .createUserWithEmailAndPassword(email.trim(), password.trim())
            .then(r => {
              setSignUpLoader(false)
              firestore().collection('Users').doc(r?.user?.uid)
                .set({
                  email,
                  userName,
                  id: r?.user?.uid
                }).then(r => {
                  setEmail('');
                  setPassword('');
                  setUserName('');
                  setSignUpLoader(false)
                  dispatch(login({
                    email,
                    userName,
                    id: r?.user?.uid
                  }))
                  showMessage({
                    message: 'Success',
                    description: 'Succfully logged In',
                    type: 'success',
                  });
                }).catch(err => {
                  console.log(err)
                  setSignUpLoader(false)
                  showMessage({
                    message: 'Error',
                    description: err?.message ?? 'Something went wrong.',
                    type: 'danger',
                  });
                })
            })
            .catch(error => {
              setSignUpLoader(false)
              if (error.code === 'auth/email-already-in-use') {
                navigation.goBack()
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                showMessage({
                  message: 'Error',
                  description: 'That email address is already in use! Please login.',
                  type: 'danger',
                });
              }
              if (error.code === 'auth/invalid-email') {
                showMessage({
                  message: 'Error',
                  description: 'That email address is invalid!',
                  type: 'danger',
                });
              } else {
                showMessage({
                  message: 'Error',
                  description: error.code.split('/')[1].replace('-', ' ') ?? "Something went wrong.",
                  type: 'danger',
                });
              }
            });
        }
        else
          setError("Password can't be empty.")
      }
      else
        setError("Username can't be empty.")
    }
    else
      setError(emailValidation.message)
  };
  const navigateLogin = () => props.navigation.replace('Login')
  return (
    <ScreenWrapper statusBarColor={AppColors.black25} barStyle='light-content' scrollEnabled>
      <View style={styles.mainViewContainer}>
        <Animatable.Image animation={"fadeInUp"} source={{ uri: 'https://www.werplay.com/rsrc/images/temp.png' }} style={styles.logo} />
        <Animatable.View style={styles.formContainer} animation={"zoomInUp"}>
          <Text style={styles.heading}>Create Account</Text>
          <Input label='Email' value={email} onChangeText={setEmail} />
          <Input label='Full Name' value={userName} onChangeText={setUserName} />
          <Input label='Password' value={password} onChangeText={setPassword} />
          <Text style={CommonStyles.errorText}>{error}</Text>
          <Button title="Create Account" onPress={signUp} isLoading={signUpLoader} />
          <Text style={styles.haveAccount}>
            Don't have an account?
            <Text onPress={navigateLogin} style={styles.login}>
              {' Login'}
            </Text>
          </Text>
        </Animatable.View>
      </View>
    </ScreenWrapper>
  );
}
