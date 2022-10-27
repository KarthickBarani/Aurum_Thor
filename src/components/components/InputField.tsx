import { ReactElement } from "react"
import InputMask from 'react-input-mask'



const ErrorMessage = ({ children }) => {
    return (
        <small className='text-danger'>{children}</small>
    )
}

export const InputTextField = (props: {
    label: string
    name: string
    id: string
    type: string
    className: string
    value: number | string | undefined
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    readOnly?: boolean
    icon?: ReactElement
    formError?: any
    required?: boolean
    temp?: any
}) => {
    return (
        <>
            <label htmlFor={props.name} className={`form-label fw-bolder fs-6 gray-700 mt-2 ${props.required ? 'required' : ''}`}   > {props.label}</label>
            <div className="position-relative">
                <input id={props.id} name={props.name} type={props.type} min={props.type === 'number' ? 0 : undefined} className={props.className + `${props.icon ? ' ps-10' : ''}`} value={props?.value} onChange={props.onChange} onBlur={props.onBlur} readOnly={props.readOnly} required={props.required} />
                <div className="position-absolute translate-middle-y top-50 start-0 ms-2">
                    {props.icon ? props.icon : null}
                </div>
            </div>
            {props.formError
                ? props.formError[props.name]
                    ? Array.isArray(props.formError[props.name]) || (typeof props.formError[props.name] === 'object' && props.formError[props.name] !== null)
                        ? <ErrorMessage>{Array.isArray(props.formError[props.name]) ? props.formError[props.name][props.temp - 1][props.id] : props.formError[props.name][props.id]} </ErrorMessage>
                        : <ErrorMessage>{props.formError[props.name]}</ErrorMessage>
                    : null
                : null}
        </>
    )
}

export const InputTextAreaField = (props: { label: string, name: string, id: string, className: string, value: number | string, onChange?: React.ChangeEventHandler<HTMLTextAreaElement>, onBlur?: React.FocusEventHandler<HTMLTextAreaElement>, readOnly?: boolean, formError?: any, required?: boolean }) => {
    return (
        <>
            <label htmlFor={props.name} className={`form-label fw-bolder fs-6 gray-700 mt-2 ${props.required ? 'required' : ''}`}>{props.label}</label>
            <textarea id={props.id} name={props.name} className={props.className} value={props?.value} onChange={props.onChange} onBlur={props.onBlur} readOnly={props.readOnly} required={props.required} />
            <ErrorMessage>{props.formError}</ErrorMessage>
        </>
    )
}
export const InputTextDateField = (props: { label: string, name: string, id: string, className: string, value: number | string, onChange?: React.ChangeEventHandler<HTMLTextAreaElement>, onBlur?: React.FocusEventHandler<HTMLTextAreaElement>, readOnly?: boolean, formError?: any, required?: boolean }) => {
    return (
        <>
            <label htmlFor={props.name} className={`form-label fw-bolder fs-6 gray-700 mt-2 ${props.required ? 'required' : ''}`}>{props.label}</label>
            <InputMask
                id={props.id}
                name={props.name}
                className={props.className}
                mask="99-99-9999"
                maskPlaceholder="MM-DD-YYYY"
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            {
                props.formError
                    ?
                    props.formError[props.name]
                        ?
                        <ErrorMessage>
                            {props.formError[props.name]}
                        </ErrorMessage>
                        :
                        null
                    :
                    null
            }
        </>
    )
}


export const InputSelectField = (props: {
    label: string,
    name: string,
    id: string,
    className: string,
    value: number | string,
    onChange: React.ChangeEventHandler<HTMLSelectElement>,
    onBlur: React.FocusEventHandler<HTMLSelectElement>,
    option: {
        id: number
        value: string
    }[],
    icon?: ReactElement,
    formError?: any,
    required?: boolean
}) => {
    return (<>
        <label
            htmlFor={props.name}
            className={`form-label fw-bolder fs-6 gray-700 mt-2 ${props.required ? 'required' : ''}`}>
            {props.label}
        </label>
        <div className="position-relative">
            <select id={props.id}
                name={props.name}
                className={props.className}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                required={props.required}
            >
                <option key={0} value={0}></option>
                {props.option.map(option => (<option key={option.id} value={option.id}>{option.value}</option>))}
            </select>
            <div
                className="position-absolute translate-middle-y top-50 end-0 me-15">
                {props.icon ? props.icon : null}
            </div>
        </div>
        {
            props.formError
                ?
                props.formError[props.name]
                    ?
                    <ErrorMessage>
                        {props.formError[props.name]}
                    </ErrorMessage>
                    :
                    null
                :
                null
        }
    </>
    )
}