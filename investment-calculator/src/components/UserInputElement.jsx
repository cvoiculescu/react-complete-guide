export const UserInputElement = ({title, ...props}) => (
    <p>
        <label>{title}</label>
        <input type="number" min="0" required {...props}/>
    </p>
);
