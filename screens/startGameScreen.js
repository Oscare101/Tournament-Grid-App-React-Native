import React, { useState } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'

export default function StartGameScreen(props) {
  const [list, setList] = useState([
    'one',
    'two',
    'three',
    'four',
    '1',
    '2',
    '3',
    '4',
  ])

  function checkUnic() {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i] == list[j]) {
          console.log(list[i], list[j])
          break
        }
      }
    }
    props.onStartGame(list)
  }

  return (
    <View>
      <StatusBar />
      <TouchableOpacity
        onPress={() => {
          checkUnic()
        }}
      >
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  )
}
