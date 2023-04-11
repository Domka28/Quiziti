import React from 'react';


export default function Question(props) {
    const { questionData } = props
    const { answers } = questionData

    console.log(answers)

    const answerComponent = answers.map((answer, index) => {
        return (<p key={index} className="answer">{answer}</p>)
    })



    // let styles;
    // function changeColor() {
    //     styles = { backgroundColor: "#D6DBF5" }
    //     console.log("changecolor")
    // }

    //            .map(answer => {
    //     return (<p className="answer" style={styles} >{answer}</p>)
    // })





    return (
        <div className="question-container">
            <h1 className="question">{questionData.question}</h1>
            <div className="answers">
                {answerComponent}
            </div>
        </div>
    )
}