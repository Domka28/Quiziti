import './App.css';
import React, { useEffect, useState } from 'react';
import Start from "./components/Start"
import Question from './components/Question';

function App() {
  const [questionsData, setQuestionsData] = useState([])
  const [isGameStarted, setGameStarted] = useState(false)
  const [isCheckAnswer, setCheckAnswer] = useState(false)

  useEffect(() => {
    if (isGameStarted) {
      console.log("fetch data")
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => {
          const transformedData = transformData(data.results)
          setQuestionsData(transformedData)
        }
        )
    }
  }, [isGameStarted])

  const transformData = (data) => {
    return data.map((el, index) => {

      const arrayOfAnswers = el.incorrect_answers
      arrayOfAnswers.push(el.correct_answer)
      arrayOfAnswers.sort();

      return {
        id: index,
        question: el.question,
        answers: arrayOfAnswers,
        correctAnswer: el.correct_answer,
        selectedAnswer: ""
      }
    })
  }
  const questionsComponent = questionsData.map(question => {
    return (
      <Question key={question.question} checkAnswer={isCheckAnswer} question={question} setQuestionsData={setQuestionsData} />
    )
  });
  const newGame = () => {
    setGameStarted(true)
  }
  const checkAnswers = () => {
    setCheckAnswer(true)
  }
  const playAgain = () => {
    console.log("play")
  }

  return (
    <div className="main-container">
      <Start />
      {questionsData && questionsComponent}
      {!isGameStarted && <button
        className="start-btn"
        onClick={newGame}
      >Start quiz
      </button>}
      {isGameStarted && !isCheckAnswer && < button
        className="check-btn"
        onClick={checkAnswers}
      >Check answers
      </button>}
      {
        isCheckAnswer && <button
          className="play-btn"
          onClick={playAgain}
        >Play again
        </button>
      }
    </div >

  );
}

export default App;
