export default function UserInputElement({title, ...props}) {
    return <p>
        <label>{title}</label>
        <input type="number" min="0" required {...props}/>
    </p>;
}
