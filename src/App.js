import './App.css';
import React, { useEffect, useState } from 'react';
import Start from "./components/Start"
import Question from './components/Question';

function App() {
  const [questionsData, setQuestionsData] = useState([])
  const [isGameStarted, setGameStarted] = useState(false)
  const [isCheckAnswer, setCheckAnswer] = useState(false)
  const [newQuiz, setNewQuiz] = useState(0)

  useEffect(() => {
    if (isGameStarted) {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => {
          const transformedData = transformData(data.results)
          setQuestionsData(transformedData)
          setCheckAnswer(false)
        }
        )
    }
  }, [isGameStarted, newQuiz])

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

  function scoredCorrectAnswers() {
    let counter = 0;
    for (let question of questionsData) {
      if (question.selectedAnswer == question.correctAnswer) {
        counter++
      }
    }
    return counter
  }

  function areAllAnswerSelected() {
    const selectedAns = questionsData.length > 0 && questionsData.every(element => element.selectedAnswer !== "")
    return selectedAns

  }


  const questionsComponent = questionsData.map(question => {
    return (
      <Question key={question.question} isCheckAnswer={isCheckAnswer} question={question} setQuestionsData={setQuestionsData} />
    )
  });
  const newGame = () => {
    setGameStarted(true)
  }
  const checkAnswers = () => {
    setCheckAnswer(true)
  }
  const playAgain = () => {
    setNewQuiz(newQuiz + 1)
  }

  return (
    <div className="main-container">
      {!isGameStarted && <Start />}
      {questionsData && questionsComponent}
      {isCheckAnswer && <p className="summary">You scored {scoredCorrectAnswers()}/5 correct answers</p>}
      {!isGameStarted && <button
        className="start-btn"
        onClick={newGame}
      >Start quiz
      </button>}
      {!isCheckAnswer && areAllAnswerSelected() && < button
        className="check-btn"
        onClick={checkAnswers}
      >Check answers
      </button>}
      {isCheckAnswer && <button
        className="play-btn"
        onClick={playAgain}
      >Play again
      </button>
      }
    </div >

  );
}

export default App;
