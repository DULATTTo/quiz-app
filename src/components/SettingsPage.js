import React from "react"

export default function SettingsPage(props) {
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
                    <option value="">Any Category</option>
                    <option value="&category=9">General Knowledge</option>
                    <option value="&category=10">Books</option>
                    <option value="&category=11">Films</option>
                    <option value="&category=12">Music</option>
                    <option value="&category=31">Japanese Anime & Manga</option>
                    <option value="&category=15">Video Games</option>
                    <option value="&category=32">Cartoon & Animations</option>
                    <option value="&category=14">Television</option>
                    <option value="&category=16">Board Games</option>
                    <option value="&category=17">Science & nature</option>
                    <option value="&category=18">Science: Computers</option>
                    <option value="&category=19">Science: Mathematics</option>
                    <option value="&category=20">Mythology</option>
                    <option value="&category=21">Sports</option>
                    <option value="&category=22">Geography</option>
                    <option value="&category=23">History</option>
                    <option value="&category=24">Politics</option>
                    <option value="&category=27">Animals</option>
                    <option value="&category=28">Vehicles</option>
                    <option value="&category=29">Comics</option>
                </select>
                
                <br />
                
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select 
                    id="difficulty" 
                    value={props.formData.difficulty}
                    onChange={(event) => props.handleChange(event)}
                    name="difficulty"
                >
                    <option value="">Any Difficulty</option>
                    <option value="&difficulty=easy">Easy</option>
                    <option value="&difficulty=medium">Medium</option>
                    <option value="&difficulty=hard">Hard</option>
                </select>
                
                <br />
                
                <label htmlFor="questionsNum">Number of Questions:</label>
                <select 
                    id="questionsNum" 
                    value={props.formData.questionsNum}
                    onChange={(event) => props.handleChange(event)}
                    name="questionsNum"
                >
                    <option value="amount=5">5</option>
                    <option value="amount=10">10</option>
                    <option value="amount=15">15</option>
                    <option value="amount=20">20</option>
                    <option value="amount=25">25</option>
                    <option value="amount=30">30</option>
                    <option value="amount=35">35</option>
                    <option value="amount=40">40</option>
                    <option value="amount=45">45</option>
                    <option value="amount=50">50</option>
                </select>

            </form>
        </div>
    )
}
