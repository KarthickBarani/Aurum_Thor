


export const Label = (props: {
    for: string
    name: string
    className: string
}) => (<label htmlFor={props.for} className={props.className}>{props.name}</label>)

export const InputTextField = (props: { name: string, id: string, type: string, className: string, value: number | string, onChange: React.ChangeEventHandler<HTMLInputElement>, onBlur: React.FocusEventHandler<HTMLInputElement> }) => {
    return (
        <input id={props.id} name={props.name} className={props.className} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
    )
}

export const InputSelectField = ({ children, props }) => {
    return (
        <select {...props} >
            {children}
        </select>
    )
}

// export const InputSelectField = (props: { name: string, id: string, className: string, value: number | string, onChange: React.ChangeEventHandler<HTMLSelectElement>, onBlur: React.FocusEventHandler<HTMLSelectElement>, children: any }) => {
//     return (
//         <select id={props.id} name={props.name} className={props.className} value={props.value} onChange={props.onChange} onBlur={props.onBlur} >
//             {props.children}
//         </select>
//     )
// }
