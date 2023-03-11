import React from "react"

export default function SettingsPage(props) {
    const options = {
        category: [
            { value: "", label: "Any Category" },
            { value: "&category=9", label: "General Knowledge" },
            { value: "&category=10", label: "Books" },
            { value: "&category=11", label: "Films" },
            { value: "&category=12", label: "Music" },
            { value: "&category=31", label: "Japanese Anime & Manga" },
            { value: "&category=15", label: "Video Games" },
            { value: "&category=32", label: "Cartoon & Animations" },
            { value: "&category=14", label: "Television" },
            { value: "&category=16", label: "Board Games" },
            { value: "&category=17", label: "Science & nature" },
            { value: "&category=18", label: "Science: Computers" },
            { value: "&category=19", label: "Science: Mathematics" },
            { value: "&category=20", label: "Mythology" },
            { value: "&category=21", label: "Sports" },
            { value: "&category=22", label: "Geography" },
            { value: "&category=23", label: "History" },
            { value: "&category=24", label: "Politics" },
            { value: "&category=27", label: "Animals" },
            { value: "&category=28", label: "Vehicles" },
            { value: "&category=29", label: "Comics" },
        ],
        difficulty: [
            { value: "", label: "Any Difficulty" },
            { value: "&difficulty=easy", label: "Easy" },
            { value: "&difficulty=medium", label: "Medium" },
            { value: "&difficulty=hard", label: "Hard" },
        ],
        questionsNum: [
            { value: "amount=5", label: "5" },
            { value: "amount=10", label: "10" },
            { value: "amount=15", label: "15" },
            { value: "amount=20", label: "20" },
            { value: "amount=25", label: "25" },
            { value: "amount=30", label: "30" },
            { value: "amount=35", label: "35" },
            { value: "amount=40", label: "40" },
            { value: "amount=45", label: "45" },
            { value: "amount=50", label: "50" },
        ],
    }   


    return (
        <div>
            <button 
                onClick={props.getOrGetOffSettings}
                className="menu-btn"
            >   
                Back to Menu
            </button>
            
            <br />
            <br />
            
            <form className="flex settings-form">
                <label htmlFor="category">Select Category:</label>
                <select 
                    className="category"
                    id="category" 
                    value={props.formData.category}
                    onChange={(event) => props.handleChange(event)}
                    name="category"
                >
                    {options.category.map(({value, label}) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                
                <br />
                
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select 
                    id="difficulty" 
                    value={props.formData.difficulty}
                    onChange={(event) => props.handleChange(event)}
                    name="difficulty"
                >
                    {options.difficulty.map(({value, label}) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                
                <br />
                
                <label htmlFor="questionsNum">Number of Questions:</label>
                <select 
                    id="questionsNum" 
                    value={props.formData.questionsNum}
                    onChange={(event) => props.handleChange(event)}
                    name="questionsNum"
                >
                    {options.questionsNum.map(({value, label}) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>

            </form>
        </div>
    )
}
