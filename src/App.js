import './App.css';
import React, { useEffect, useState } from 'react';
import Start from "./components/Start"
import Question from './components/Questions';


function App() {
  const [questions, setQuestions] = useState()


  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setQuestions(data.results[0])
      }
      )
  }, [])



  const newGame = () => {

  }

  return (
    <div className="main-container">
      <Start />
      <Question questions={questions} />
      <button
        className="start-btn"
        onClick={newGame}
      >Start quiz</button>
    </div>

  );
}

export default App;
