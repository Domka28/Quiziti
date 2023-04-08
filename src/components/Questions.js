import React from 'react';


export default function Question(props) {


    return (
        <div className="question-container">
            <h1 className="question">How would one say goodbye in Spanish?</h1>
            <div className="answers">
                <p className="answer">Adiós</p>
                <p className="answer">Hola</p>
                <p className="answer">Au Revoir</p>
                <p className="answer">Salir</p>
            </div>
        </div>
    )
}