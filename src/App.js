import './App.css';
import React, { useEffect, useState } from 'react';
import Start from "./components/Start"
import Question from './components/Question';


function App() {
  const [questionData, setQuestionData] = useState([])
  const [counter, setCounter] = useState(0)


  useEffect(() => {
    console.log("useEffect")
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestionData(data.results)
      }
      )
  }, [counter])


  const questionsComponent = questionData.map(question => {
    return (
      <Question questionData={question} />
    )
  });

  const newGame = () => {
    setCounter(prevCounter => prevCounter + 1)
  }


  return (
    <div className="main-container">
      <Start />
      {questionData && questionsComponent}
      <button
        className="start-btn"
        onClick={newGame}
      >Start quiz</button>
    </div>

  );
}

export default App;
