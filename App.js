import React, { useState } from 'react'

import GameScreen from './screens/gameScreen'
import StartGameScreen from './screens/startGameScreen'

export default function App() {
  const [isGame, setIsGame] = useState(false)
  const [list, setList] = useState(false)

  const content = isGame ? (
    <GameScreen list={list} onStopGame={() => setIsGame(false)} />
  ) : (
    <StartGameScreen
      onStartGame={(list) => {
        setList(list)
        setIsGame(true)
      }}
    />
  )

  return <>{content}</>
}
