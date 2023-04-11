import React from 'react';


export default function Question(props) {
    const { question, setQuestionsData } = props
    const { answers } = question

    function selectAnswer(answer, id) {
        setQuestionsData(prevQuestionsData => {
            const newQuestionsData = []
            for (let question of prevQuestionsData) {
                if (id === question.id) {
                    newQuestionsData.push({ ...question, selectedAnswer: answer })
                } else {
                    newQuestionsData.push(question)
                }
            }
            return newQuestionsData
        })
    }


    function getClass(answer) {
        if (answer === question.selectedAnswer) {
            return "answer selectedAnswer"
        } else {
            return "answer"
        }
    }

    const answerComponent = answers.map((answer, index) => {
        return (<p onClick={() => { selectAnswer(answer, question.id) }}
            key={index}
            className={getClass(answer)}>{answer}</p>)
    })

    return (
        <div className="question-container">
            <h1 className="question">{question.question}</h1>
            <div className="answers">
                {answerComponent}
            </div>
        </div>
    )
}