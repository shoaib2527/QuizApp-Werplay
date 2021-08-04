import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import styles from './styles';
import Logout from '../../assets/images/logout.png'
const Component = ({ item, count = 0, containerStyle }) => {
  const [options, setOptions] = useState(item?.incorrect_answers)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  useEffect(() => {
    let newOptions = item?.incorrect_answers;
    newOptions.splice(getRandomInt(3), 0, item?.correct_answer)
    setOptions(newOptions)
  }, [item])

  const renderOption = ({ item, index }) => {
    return <View style={styles.optionContainer}>
      <Text>{item}fff</Text>
    </View>
  }
  console.log(options)
  return (<View style={[styles.container, containerStyle ? containerStyle : null]}>
    <Text style={styles.category}>{item?.category}</Text>

    <FlatList
      style={{ backgroundColor: 'blue' }}
      data={options}
      renderItem={renderOption}
      keyExtractor={(item, index) => index.toString()} />
    <Text style={styles.questionText}>{count > 0 ? "Q no." + count + ": " : ''} {item?.question}</Text>
  </View>)
};

export default Component;
