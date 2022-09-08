import React from "react"

export default function Quiz(props) {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    return (
        <div className="question">
            <h3>{decodeHtml(props.value.question)}</h3>
        </div>
    )
}
