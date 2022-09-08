import React from "react"
import {useState, useEffect} from "react"
import MenuPage from "./components/MenuPage.js"
import Quiz from "./components/Quiz.js"
import Answer from "./components/Answer.js"
import SettingsPage from "./components/SettingsPage.js"
import LoadingScreen from "./components/LoadingScreen.js"
import {nanoid} from "nanoid"


export default function App() {
    const [isStarted, setIsStarter] = useState({
        state: false,
        count: 0
    })
    const [settingsPage, setSettingsPage] = useState(false)
    const [allQuizzes, setAllQuizzes] = useState([])
    const [allAnswers, setAllAnswers] = useState([])
    const [isFinished, setIsFinished] = useState(false)
    const [count, setCount] = useState(0)
    const [restartAll, setRestartAll] = useState([false])
    const [isLoading, setIsLoading] = useState({
        status: false,
        count: 0
    })
    const [settingsFormData, setSettingsFormData] = useState(
        {
            questionsNum: "amount=5",
            category: "",
            difficulty: ""
        }
    )
    
    
    useEffect(() => {
        fetch(`https://opentdb.com/api.php?${settingsFormData.questionsNum}${settingsFormData.category}${settingsFormData.difficulty}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                const ansArr = data.results.map(quiz => {
                    return quiz.incorrect_answers.concat(quiz.correct_answer).sort((a, b) => (
                        0.5 - Math.random())
                    )
                })
                const ansArrObjArr = ansArr.map(arr => arr.map(obj => ({
                    answerEl: {
                        answerValue: obj,
                        answerId: nanoid(),
                        isHeld: false,
                        isCorrect: false
                    }
                })))
                const ansArrMain = ansArrObjArr.map(arr => ({value: arr, id: nanoid()}))
                
                setAllAnswers(ansArrMain)
                
                setAllQuizzes(data.results.map(quiz => ({
                    question: quiz.question,
                    answers: quiz.incorrect_answers.concat(quiz.correct_answer),
                    correctAnswer: quiz.correct_answer,
                    id: nanoid()
                })))
                setIsLoading({status: false, count: 1})
            })
    }, [restartAll])
    
    
    function startOrQuitQuiz() {
        setIsStarter(prevVal => ({state: !prevVal.state, count: 1}))
        setIsLoading(prevVal => prevVal.count === 1 ? 
            {...prevVal, status: false} : {...prevVal, status: true})
    }
    
    function getOrGetOffSettings() {
        setSettingsPage(prevVal => !prevVal)
    }
    
    
    function optionClick(id, value, answersArrId) {
        if (!isFinished) {
            const corrAns = allQuizzes.map(obj => obj.correctAnswer)
            const answerObj = allAnswers.map((obj, i) => {
                if (obj.id === answersArrId) { 
                    return {
                        value: obj.value.map(arrObj => {
                        if (arrObj.answerEl.answerId === id) {
                            if (corrAns.includes(value)) {
                                return {
                                    answerEl: {
                                        ...arrObj.answerEl, 
                                        isCorrect: true,
                                        isHeld: !arrObj.answerEl.isHeld
                                    }
                                } 
                            } else {
                                return {
                                    answerEl: {
                                        ...arrObj.answerEl, 
                                        isCorrect: false,
                                        isHeld: !arrObj.answerEl.isHeld
                                    }
                                }
                            }
                        } 
                        else if (corrAns[i] === arrObj.answerEl.answerValue) {
                            return {
                                answerEl: {
                                    ...arrObj.answerEl, 
                                    isCorrect: true,
                                    isHeld: false
                                }
                            }
                        }
                        else {
                            return {answerEl: {...arrObj.answerEl, isHeld: false, isCorrect: false}}
                        }
                    }), id: obj.id}
                } else {
                    return obj
                }
            })
            setAllAnswers(answerObj)
        }
    }
    
    
    function checkAnswers() {
        const allHeldArr = allAnswers.map(obj => {
            return obj.value.map(answer => answer.answerEl.isHeld)
        })
        const checkAllHeld = allHeldArr.map(arr => arr.includes(true))
        const checkedAnsArr = allAnswers.map(obj => {
            return obj.value.map(answer => answer.answerEl.isCorrect)
        })
        if (checkAllHeld.every(ans => ans === true)) {
            setIsFinished(true)
        }
        let count = 0
        const correctAnsArray = flatten(checkedAnsArr)
        const heldAnsArray = flatten(allHeldArr)
        for (let i = 0; i < flatten(checkedAnsArr).length; i++) {
            if (correctAnsArray[i] && correctAnsArray[i] === heldAnsArray[i]) count++
        }
        setCount(count)
    }

    
    function restart() {
        setRestartAll([true])
        setIsFinished(false)
        setIsLoading({status: true, count: 0})
    }
    
    
    function flatten(arr) {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                newArr = newArr.concat(flatten(arr[i]))
            } else newArr.push(arr[i])
        }
        return newArr
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setSettingsFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        setIsStarter(prevVal => ({...prevVal, count: 0}))
        setRestartAll([true])
    }
    
    
    const answerElements = allAnswers.map(answerObj => {
        return (
            <Answer
                value={answerObj.value.map(answer => answer.answerEl)}
                optionClick={optionClick}
                id={answerObj.id}
                isFinished={isFinished}
            />
        )
    })
    
    const quizElements = allQuizzes.map((quiz, index) => {
        return (
            <main 
                key={nanoid()}
            >
                <Quiz 
                    value={quiz}
                    key={quiz.id}
                />
                {answerElements[index]}
                <hr />
            </main>
        )
    })
    
    
    return (
        <div>
            {
                !isLoading.status
                ?
                <div>
                    {
                        !isStarted.state 
                        ?
                        <div>
                            {
                                !settingsPage ?
                                <MenuPage 
                                    startOrQuitQuiz={startOrQuitQuiz}
                                    getOrGetOffSettings={getOrGetOffSettings}
                                    isStarted={isStarted}
                                />
                                :
                                <SettingsPage 
                                    getOrGetOffSettings={getOrGetOffSettings}
                                    formData={settingsFormData}
                                    handleChange={handleChange}
                                />
                            }
                        </div>
                        :
                        <div>
                            <button 
                                onClick={startOrQuitQuiz}
                                className="menu-btn"
                            >   
                                Back to Menu
                            </button>
                            <div className="quiz-main">
                                <div>
                                    {quizElements}
                                </div>
                                {
                                    !isFinished 
                                    ? 
                                    <button 
                                        onClick={checkAnswers}
                                        className="check-btn"
                                    >
                                        Check answers
                                    </button> 
                                    :
                                    <div className="finalScore">
                                        <p
                                            className="score-text"
                                        >
                                            You scored {`${count}/${allAnswers.length}`} correct answers
                                        </p>
                                        <button 
                                            onClick={restart}
                                            className="restart-btn"
                                        >
                                            Play again
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
                :
                <LoadingScreen />
            }
        </div>
    )
}


