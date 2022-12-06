import { Fields, FieldValue } from "./Interface/Interface"
import { RemoveSvg } from "./Svg/Svg"

export const DynamicField = (props: {
    index: number
    field: any
    DyFields: any
    setDyFields: Function
}) => {


    const removeFields = () => {
        // let delarr = [...props.DyFields]
        // delarr.splice(props.index, 1)
        // props.setDyFields(delarr)
        // console.log(delarr)
    }

    return (
        <>
            <div className="col-3 d-flex flex-stack mt-2">
                <div className="form-group w-100">
                    <label htmlFor={props.field.Field} className="form-label">{props.field.FieldName}</label>
                    <input name={props.field.Field} id={props.field.Field} type="text" className="form-control form-control-sm" />
                </div>
                <div className="align-self-center mt-8 ms-2" >
                    <button onClick={(removeFields)} title="Delete" className=" btn btn-active-light-danger btn-icon btn-sm btn-hover-rise">
                        <RemoveSvg clsName="svg-icon svg-icon-2 svg-icon-danger" />
                    </button>
                </div>
            </div>
        </>
    )
}