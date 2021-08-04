import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import CheckedIcon from '../../assets/images/selected.png';
import UnCheckedIcon from '../../assets/images/unselected.png';
import Button from '../Button';
import styles from './styles';
const Question = ({ item, containerStyle, onSubmit = () => { } }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  useEffect(() => setSelectedIndex(-1), [item])
  const renderOption = ({ item, index }) => {
    const isSelected = index == selectedIndex
    return <Pressable style={styles.optionContainer} onPress={() => setSelectedIndex(index)}>
      <Image style={[styles.icon]} key={index.toString()} resizeMode="contain" source={isSelected ? CheckedIcon : UnCheckedIcon} />
      <Text style={styles.optionText}>{item.replaceAll('&#039;',`'`)}</Text>
    </Pressable>
  }
  return (<View style={[styles.container, containerStyle ? containerStyle : null]}>
    <Text style={styles.category}>{item?.category}</Text>
    <Text style={styles.questionText}>{item?.question}</Text>
    <FlatList
      style={styles.flatList}
      data={item?.options}
      renderItem={renderOption}
      keyExtractor={(item, index) => index.toString()} />
    <Button title="Submit" disabled={selectedIndex < 0} onPress={() => { onSubmit(item?.options[selectedIndex]) }} />
  </View>)
};

export default Question;
