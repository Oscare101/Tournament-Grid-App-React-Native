import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default function GameScreen(props) {
  const [players, setPlayers] = useState([])
  const [action, setAction] = useState([[], [], []])
  const listLeangth = props.list.length
  useEffect(() => {
    setPlayers(props.list)
  }, [props.list])
  const listParams = []
  for (let i = 1; i <= props.list.length; i *= 2) {
    listParams.push(props.list.length / i)
  }

  function onElementRound(title) {
    let currentIndex = players.indexOf(title)
    if (
      currentIndex % 2 == 0
        ? players.reduce(
            (total, x) => (x == players[currentIndex + 1] ? total + 1 : total),
            0
          ) == 2
        : players.reduce(
            (total, x) => (x == players[currentIndex - 1] ? total + 1 : total),
            0
          ) == 2
    ) {
      return false
    } else {
      if (
        title &&
        players.reduce((total, x) => (x == title ? total + 1 : total), 0) == 1
      ) {
        setPlayers((current) => [...current, title])
        setAction((current) => [...current, title])
      } else if (
        title &&
        players.reduce((total, x) => (x == title ? total + 1 : total), 0) == 2
      ) {
        for (let index = players.length - 1; index >= 0; index--) {
          if (title == players[index]) {
            setPlayers(players.filter((_, i) => i !== index))
            setAction(action.filter((_, i) => i !== index - listLeangth))
            break
          }
        }
      }
    }
    console.log('--------')
    console.log('players', players, 'action', action)
  }

  function Elements(props) {
    if (typeof props.title === 'object') {
      return (
        <Row style={styles.bb} key={Math.random()}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                players.reduce(
                  (total, x) => (x == props.title ? total + 1 : total),
                  0
                ) == 2
                  ? 'red'
                  : '#44444444',
            }}
            onPress={() => onElementRound(props.title)}
          >
            <Text>{action[props.title[0]][props.title[1]]}</Text>
          </TouchableOpacity>
        </Row>
      )
    } else {
      return (
        <Row style={styles.bb} key={Math.random()}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                players.reduce(
                  (total, x) => (x == props.title ? total + 1 : total),
                  0
                ) == 2
                  ? 'red'
                  : '#44444444',
            }}
            onPress={() => onElementRound(props.title)}
          >
            <Text>{props.title}</Text>
          </TouchableOpacity>
        </Row>
      )
    }
  }

  function RowRender(props) {
    if (props.state[0] === 0) {
      return Array.from({ length: props.count }, (i, index) => (
        <Elements title={players[index]} key={Math.random()} />
      ))
    } else if (true) {
      return Array.from({ length: props.count }, (i, index) => (
        <Elements title={[props.state[0] - 1, index]} key={Math.random()} />
      ))
    } else {
      return Array.from({ length: props.count }, (i, index) => (
        <Elements title="" />
      ))
    }
  }

  function ContentBlock() {
    return (
      <>
        {listParams.map((count, index) => (
          <Col style={styles.bb} key={Math.random()}>
            <RowRender
              count={count}
              state={[index, count]}
              key={Math.random()}
            />
          </Col>
        ))}
      </>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Grid>
        <ContentBlock />
      </Grid>
      <TouchableOpacity onPress={props.onStopGame}>
        <Text>back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bb: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 2,
  },
})
