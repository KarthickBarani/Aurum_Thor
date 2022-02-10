
import { userProfileType } from "./Interface"

export const LevelElement = (props: {
    levelElements: number[]
    index: number
    setLevelElements: Function
    formik: any
    users?: userProfileType
}) => {


    const removeLevel = () => {
        let delarr = props.levelElements.filter(arr => props.levelElements.indexOf(arr) !== props.index)
        props.setLevelElements(delarr)
        console.log(delarr)
    }

    return (
        <>
            <div className="row my-2">
                <div className="col-6">
                    <div className="row">
                        <div className="col-2 align-self-center">
                            <label htmlFor="level" className="form-label fw-bolder">Level-{props.index + 1}</label>
                        </div>
                        <div className="col-10">
                            <label htmlFor="approver" className="form-label">Approver</label>
                            <select name={'approver[' + props.index + ']'} id={'approver[' + props.index + ']'} value={props.formik.values.approver[props.index]} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} className="form-select form-select-sm">
                                <option key={0} value={0}></option>
                                {
                                    props.users?.map(user => (
                                        <option key={user.Id} value={user.Id}>{`${user.FirstName} ${user.LastName}`}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                </div>
                {/* <div className="col-3">
                    <div className="from-group d-flex flex-column">
                    <label className="form-label">Option</label>
                        <div className="nav nav-tab btn-group btn-group-sm" role='tablist' aria-label="Basic example">
                            <button role='tab' type="button" data-bs-toggle="tab" data-bs-target={'#amountt' + (props.index + 1)} className="btn btn-light-primary active">Amount</button>
                            <button role='tab' type="button" data-bs-toggle="tab" data-bs-target={'#percentaget' + (props.index + 1)} className="btn btn-light-primary">Percentage</button>
                        </div>
                    </div>
                </div> */}
                <div className="col-6">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor={'amount'} className="form-label">Amount</label>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">$</span>
                                    <input name={'amount[' + props.index + ']'} id={'amount[' + props.index + ']'} type="number" className="form-control from-control-sm" value={props.formik.values.amount[props.index]} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} />
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor={'percentage'} className="form-label">Percentage</label>
                                <div className="input-group input-group-sm">
                                    <input name={'percentage[' + props.index + ']'} id={'percentage[' + props.index + ']'} type="number" min={0} max={100} maxLength={3} className="form-control from-control-sm" value={props.formik.values.percentage[props.index]} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} />
                                    <span className="input-group-text">%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 align-self-end">
                            <button onClick={removeLevel} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm m-1 btn-hover-rise">
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
                </div>
                <div className="separator border-3 border-light my-2"></div>
            </div>
        </>
    )
}