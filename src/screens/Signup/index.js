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
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            })
            .catch(error => {
              setSignUpLoader(false)
              if (error.code === 'auth/email-already-in-use') {
                // navigation.goBack()
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
          // setTimeout(() => {
          //   showMessage({
          //     message: 'Success',
          //     description: 'Succfully logged In',
          //     type: 'success',
          //   });
          // }, 1500);
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
  const login = () => props.navigation.navigate('Login')
  return (
    <ScreenWrapper statusBarColor={AppColors.primary} barStyle='light-content' scrollEnabled>
      <View style={styles.mainViewContainer}>
        <Image source={{ uri: 'https://www.werplay.com/rsrc/images/temp.png' }} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Create Account</Text>
          <Input label='Email' value={email} onChangeText={setEmail} />
          <Input label='Username' value={userName} onChangeText={setUserName} />
          <Input label='Password' value={password} onChangeText={setPassword} />
          <Text style={CommonStyles.errorText}>{error}</Text>
          <Button title="Create Account" onPress={signUp} isLoading={signUpLoader} />
          <Text style={styles.haveAccount}>
            Don't have an account?
            <Text onPress={login} style={styles.login}>
              {' Login'}
            </Text>
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
