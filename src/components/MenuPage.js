import React from "react"

export default function MenuPage(props) {
    return (
        <div className="menu-page flex">
            <h1 className="title">Quizzical</h1>
            <button 
                onClick={props.startOrQuitQuiz}
                className="start-btn"
            >
                {!props.isStarted.count ? "Start Quiz" : "Resume Quiz"}
            </button>
            
            <br />
            
            <button 
                onClick={props.getOrGetOffSettings}
                className="settings-btn"
            >
                Settings
            </button>
        </div>
    )
}
