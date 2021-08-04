import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Question from '../../components/Question';
import ScreenWrapper from '../../components/ScreenWrapper';
import { logout } from '../../Redux/Actions/Auth';
import AppColors from '../../utills/AppColors';
import { getRandomInt, shuffleArray } from '../../utills/Methods';
import styles from './styles';
import LoadingGif from '../../assets/images/loading.gif'
import qs from './questions.json'
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const [questions, setQuestions] = useState([])
  const [selectedCategoryQs, setSelectedCategoryQs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const dispatch = useDispatch();
  const loadData = async () => {
    firestore().collection('Categories').get()
      .then(r => {
        let items = []
        r.forEach(snap => {
          items.push({
            id: snap.id, ...snap.data()
          })
        })
        firestore().collection('Questions').get()
          .then(r => {
            let ques = []
            r.forEach(snap => {
              ques.push({
                id: snap.id, ...snap.data(), options: shuffleArray([...snap.data()?.incorrect_answers,
                snap?.data().correct_answer])
              })
            })
            setQuestions(ques)
            setCurrentQuestion({
              id: 'selectcategory',
              options: items.map(item => item.category),
              category: 'Select Quiz category',
              question: ''
            })
            setLoading(false)
          }).catch(err => {
            console.log(err)
            setLoading(false)
          })
      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  }
  useEffect(() => {
    loadData()
    // qs.map(item => {
    //   firestore().collection('Questions')
    //     .add(item)
    // })
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
  const onSubmit = (answer) => {
    if (currentQuestion?.id == 'selectcategory') {
      console.log("I'm Category:", answer)
      let selectedCatQs = questions.filter(item => item.category === answer)
      setSelectedCategoryQs(selectedCatQs)
      setCurrentQuestion(selectedCatQs[getRandomInt(selectedCatQs.length - 1)])
    }
    else {
      setCurrentQuestion(selectedCategoryQs[getRandomInt(selectedCategoryQs.length - 1)])
    }
  }
  return (
    <ScreenWrapper statusBarColor={AppColors.primary} barStyle="light-content"
      headerUnScrollable={() => <Header title="Quiz at werplay" logout onPressRight={logoutMethod} />}>
      <View style={styles.mainViewContainer}>
        {loading ? <Image style={styles.loadingGif} source={LoadingGif} /> :
          <>
            {currentQuestion && <Question item={currentQuestion} onSubmit={onSubmit} />}
          </>}
      </View>
    </ScreenWrapper>
  );
}
