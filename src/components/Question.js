import React from 'react';


export default function Question(props) {
    console.log(props)
    const { questionData } = props
    return (
        <div className="question-container">
            <h1 className="question">{questionData.question}</h1>
            <div className="answers">
                <p className="answer">Adiós</p>
                <p className="answer">Hola</p>
                <p className="answer">Au Revoir</p>
                <p className="answer">Salir</p>
            </div>
        </div>
    )
}