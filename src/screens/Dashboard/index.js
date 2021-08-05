import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
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
import Button from '../../components/Button';
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const [questions, setQuestions] = useState([])
  const [cats, setCats] = useState([])
  const [selectedCategoryQs, setSelectedCategoryQs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [timer, setTimer] = useState(-1)
  const [result, setResult] = useState({ total: 0, gained: 0 })
  const [isResultVisible, showResult] = useState(false)
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
        setCats(items)
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
  const startCountDown = () => {
    setTimer(60)
    clearInterval(window.countDown)
    window.countDown = setInterval(() => {
      setTimer(timer => timer - 1)
    }, 1000)
  }
  useEffect(() => {
    if (timer == 0) {
      clearInterval(window.countDown)
      showResult(true)
      setTimer(-1)
      let date = new Date()
      firestore().collection('Users').doc(user?.id)
        .collection('Quizes').add({
          date,
          ...result,
          category: currentQuestion?.category
        })
    }
  }, [timer])
  const onSubmit = (answer) => {
    if (currentQuestion?.id == 'selectcategory') {
      let selectedCatQs = questions.filter(item => item.category === answer)
      setSelectedCategoryQs(selectedCatQs)
      setCurrentQuestion(selectedCatQs[getRandomInt(selectedCatQs.length - 1)])
      startCountDown()
    }
    else {
      let newResult = { ...result }
      newResult.total = newResult.total + 10;
      if (answer === currentQuestion?.correct_answer)
        newResult.gained = newResult.gained + 10;
      setResult(newResult)
      setCurrentQuestion(selectedCategoryQs[getRandomInt(selectedCategoryQs.length - 1)])
    }
  }
  const startAgain = () => {
    setCurrentQuestion({
      id: 'selectcategory',
      options: cats.map(item => item.category),
      category: 'Select Quiz category',
      question: ''
    })
    showResult(false)
    setResult({ gained: 0, total: 0 })
  }
  return (
    <ScreenWrapper statusBarColor={AppColors.primary} barStyle="light-content"
      headerUnScrollable={() => <Header title="Quiz at werplay" logout onPressRight={logoutMethod} />}>
      <View style={styles.mainViewContainer}>
        {loading ? <Image style={styles.loadingGif} source={LoadingGif} /> :
          isResultVisible ?
            <>
              <Text style={styles.resultPercentage}>{((result?.gained / (result?.total > 0 ? result?.total : 10)) * 100).toFixed(2)}%</Text>
              <Text style={styles.resultText}>You attempted {result?.total / 10} questions and Yous score is {result?.gained} out of {(result?.total > 0 ? result?.total : 10)}</Text>
              <Button title={"Start Again"} onPress={startAgain} />
            </>
            :
            <>
              {timer > 0 && <Text style={styles.timer}>00:{timer > 9 ? timer : '0' + timer}</Text>}
              {currentQuestion && <Question item={currentQuestion} onSubmit={onSubmit} />}
            </>}
      </View>
    </ScreenWrapper>
  );
}
