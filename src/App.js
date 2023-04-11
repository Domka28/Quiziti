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
        const transformedData = transformData(data.results)
        console.log(transformedData)
        setQuestionData(transformedData)
      }
      )
  }, [counter])

  const transformData = (data) => {
    return data.map(el => {

      const arrayOfAnswers = el.incorrect_answers
      arrayOfAnswers.push(el.correct_answer)
      arrayOfAnswers.sort();

      return {
        question: el.question,
        answers: arrayOfAnswers,
        correctAnswer: el.correct_answer,
        selectedAnswer: ""
      }
    })
  }


  const questionsComponent = questionData.map(question => {
    return (
      <Question key={question.question} questionData={question} />
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
