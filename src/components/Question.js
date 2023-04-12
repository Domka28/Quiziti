import React from 'react';

export default function Question(props) {
    const { question, setQuestionsData, isCheckAnswer } = props
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
        } else if (isCheckAnswer && answer === question.checkanswer) {
            return "answer correctAnswer"
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


// Zrobiłam onClick dla każdego z przycisków i później chciałam dla checkAnswers zrobić state, żeby po kliknięciu w
// przycisk, żeby zmienił się w true i wysyłam go w propsach to question i chciałam w zależności tego, czy jest true
// żeby wyświetlić zmianę background ale nie działą xd 