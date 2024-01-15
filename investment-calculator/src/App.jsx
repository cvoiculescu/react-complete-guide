import { useState } from "react";
import { DEFAULT_INVESTMENT_VALUES } from "./data/setup.js";

import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {

    const [userInput, setUserInput] = useState(DEFAULT_INVESTMENT_VALUES);
    const inputIsValid =
        userInput.duration >= 1;

    function handleInputChange(identifier, newValue) {
        setUserInput(oldValues => {
            return {
                ...oldValues,
                [identifier]: +newValue
            }
        });
    }

    return (
        <>
            <Header/>
            <UserInput inputs={userInput}
                       onInputChange={handleInputChange}/>
            {!inputIsValid && <p className="center">Please enter a duration greater than 0!</p>}
            {inputIsValid && <Results input={userInput}/>}
        </>
    )
}

export default App
