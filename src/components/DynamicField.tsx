import { Fields, FieldValue } from "./Interface/Interface"

export const DynamicField = (props: {
    index: number
    field: FieldValue
    DyFields: FieldValue[]
    setDyFields: Function
}) => {


    const removeFields = () => {

        let delarr = [...props.DyFields]
        delarr.splice(props.index, 1)
        props.setDyFields(delarr)
        console.log(delarr)
    }

    return (
        <>
            <div className="col-3 d-flex flex-stack mt-2">
                <div className="form-group w-100">
                    <label htmlFor={props.field.Field} className="form-label">{props.field.Label[0]}</label>
                    <input name={props.field.Field} id={props.field.Field} type="text" className="form-control form-control-sm" />
                </div>
                <div className="align-self-center mt-8 ms-2" >
                    <button onClick={removeFields} title="Delete" className=" btn btn-active-light-danger btn-icon btn-sm btn-hover-rise">
                        <span className="svg-icon svg-icon-2 svg-icon-danger mx-1"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                fill="black" />
                            <path opacity="0.5"
                                d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                fill="black" />
                            <path opacity="0.5"
                                d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                fill="black" />
                        </svg></span>
                    </button>
                </div>
            </div>
        </>
    )
}