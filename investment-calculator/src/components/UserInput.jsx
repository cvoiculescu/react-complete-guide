import { UserInputElement } from "./UserInputElement.jsx";


export default function UserInput({inputs, onInputChange}) {

    return (
        <section id="user-input">
            <div className="input-group">
                <UserInputElement title="Initial Investment"
                                  onChange={(event) => onInputChange("initialInvestment", event.target.value)}
                                  value={inputs.initialInvestment}/>
                <UserInputElement title="Annual Investment"
                                  onChange={(event) => onInputChange("annualInvestment", event.target.value)}
                                  value={inputs.annualInvestment}/>
            </div>
            <div className="input-group">
                <UserInputElement title="Expected Return"
                                  onChange={(event) => onInputChange("expectedReturn", event.target.value)}
                                  value={inputs.expectedReturn}/>
                <UserInputElement title="Duration"
                                  onChange={(event) => onInputChange("duration", event.target.value)}
                                  value={inputs.duration}/>
            </div>
        </section>
    );
}
