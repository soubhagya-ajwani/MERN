import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {

  const [counterVisible, setCounterVisible] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setCounterVisible(counterVisible => !counterVisible)
    }, 5000);
  }, [])

  return (
    <div>
      <b> Hi there</b>
      {counterVisible ? <Counter></Counter> : null}
    </div>
  )
}

function Counter() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    let clock = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)

    return (() => {
      clearInterval(clock);
    })
  }, [])

  // function increaseCount() {
  //   setCount(count + 1);
  // }

  // function decreaseCount() {
  //   setCount(count - 1);
  // }

  // function resetCount() {
  //   setCount(0);
  // }

  return (
    <div>
      <h1 id="text">{count}</h1>
      {/* <button onClick={increaseCount}>Increase Count</button>
      <button onClick={decreaseCount}>Decrese count</button>
      <button onClick={resetCount}>Reser count</button> */}
    </div>
  )
}

export default App
