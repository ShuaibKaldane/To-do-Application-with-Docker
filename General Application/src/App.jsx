import { useState } from "react"
import "./App.css"

function App() {
  const [current , setcurrent] = useState("");
  function handleChange(){
    let value = prompt("Enter your name ")
    setcurrent(value)

  }
  return (
    <>
    <button onClick={handleChange}>Start</button>
    <p> Good Morning , {current}</p>  
    </>
  )
}

export default App
