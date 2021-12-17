import React, { useState, useRef, useEffect } from 'react'
import { useInterval } from '../hooks/useInterval'
import { useDispatch } from 'react-redux'

import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from '../const/constants'
import { fetchUsersResults, sendResult } from '../store/action'
import { useHomePage } from '../hooks/useHomePage'

import styles from './HomePage.module.scss'

export const HomePage = () => {
  const canvasRef = useRef()
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState<number[]>([0, -1])
  const [speed, setSpeed] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState<number>(0)
  const [isPause, setIsPause] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const dispatch = useDispatch()
  const resultsData = useHomePage()

  useInterval(() => gameLoop(), speed)

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
    setScore(0)
  }

  const pause = () => {
    setSpeed(9999)
    setIsPause(true)
  }

  const resume = () => {
    setSpeed(100)
    setIsPause(false)
  }

  const moveSnake = ({ keyCode }: any) =>
    // @ts-ignore
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)))

  const checkCollision = (piece: Array<number>, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true
    }
    return false
  }

  const checkAppleCollision = (newSnake: Array<Array<number>>) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple()
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple()
      }
      setApple(newApple)
      return true
    }
    return false
  }

  const randomAppleScore = () => {
    const scope = [1, 5, 10]
    return scope[Math.floor(Math.random() * scope.length)]
  }

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake))
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    snakeCopy.unshift(newSnakeHead)
    if (checkCollision(newSnakeHead)) endGame()
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop()
    } else setScore((score + randomAppleScore()))
    setSnake(snakeCopy)
  }

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
  }

  const selectSpeed = () => SPEED - Math.floor(score / 50) * 10
  const changeUserName = (e: any) => setUserName(e.target.value)

  useEffect(() => {
    // @ts-ignore
    const context = canvasRef.current.getContext('2d')
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.fillStyle = 'green'
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
    context.fillStyle = 'lightblue'
    context.fillRect(apple[0], apple[1], 1, 1)
    if (score > 1) setSpeed(selectSpeed)
    if (gameOver && score > 1) dispatch(sendResult(userName, score))
  }, [snake, apple, gameOver, score])

  useEffect(() => {
    dispatch(fetchUsersResults())
  }, [])

  return (
    // @ts-ignore
    <div className={styles.container} role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <div>
        <canvas
          style={{ border: "1px solid black" }}
          // @ts-ignore
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
      </div>
      <div className={styles.navigateBlock}>
        <div className={styles.score}>
          Score: <span>{score}</span>
        </div>
        <div>
          <div>Please, enter your name</div>
          <input type='text' onChange={(e) => changeUserName(e)} placeholder='Name'/>
        </div>
        {gameOver && <div className={styles.gameOver}>GAME OVER!</div>}
        {userName.length >= 1 ?
          <div className={styles.button} onClick={startGame}>Start Game</div>
          :
          <div className={styles.disableButton}>Start Game</div>}
        {!isPause ?
          <div className={styles.button} onClick={pause}>Pause</div>
          :
          <div className={styles.button} onClick={resume}>Resume</div>
        }
        {resultsData.length !== 0 &&
        <div className={styles.tableContainer}>
          <div className={styles.tableTitle}>Results:</div>
          {resultsData.map(el => (
            <div key={el.id} className={styles.row}>
              <div className={styles.userName}>{el.userName}</div>
              <div className={styles.scoreTable}>{el.score}</div>
            </div>
          ))}
        </div>
        }
      </div>
    </div>
  )
}