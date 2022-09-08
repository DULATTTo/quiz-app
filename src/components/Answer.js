import React from "react"
import {nanoid} from "nanoid"

export default function Answer(props) {
    const answerElements = props.value.map((answer, index) => {
        let name = answer.isHeld ? "picked-answer" : "unpicked-answer"
        let endName = ""
        if (props.isFinished) {
            if (answer.isCorrect) {
                endName = "correct-answer"
            } else if (answer.isHeld && !answer.isCorrect) {
                endName = "incorrect-answer"
            } else {
                endName = "unpicked-incorrect-answer"
            }
        } 
        
        function decodeHtml(html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }
        
        return (
            <div
                key={nanoid()}
                className={`answer ${name} ${endName}`}
                onClick={() => props.optionClick(answer.answerId, answer.answerValue, props.id)}
            >
                {decodeHtml(answer.answerValue)}
            </div>
        )
    })
    
    
    
    return (
        <div className="answers-div">
            {answerElements}
        </div>
    )
}
