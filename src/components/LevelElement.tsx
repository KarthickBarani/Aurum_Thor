import { useState } from "react"
import { LevelElementError, userProfileType, WorkFlowLevel, WorkFlowTableType } from "./Interface"

export const LevelElement = (props: {

    workFlow: WorkFlowTableType
    setWorkFlow: Function
    filterApproval: WorkFlowLevel
    index: number
    type?: number
    users?: userProfileType[]
}) => {


    const [error, setError] = useState<LevelElementError>({
        approverError: [],
        amountError: [],
        percentageError: [],
        message: []
    })

    const addLevel = () => {
        let obj = { ...props.workFlow }
        obj.Approval.Level.push({
            Level: props.workFlow.Approval.Level.length,
            Approver: 0,
            Amount: 0,
            Percentage: 0
        })
        props.setWorkFlow(obj)
    }

    const removeLevel = () => {
        let obj = { ...props.workFlow }
        obj.Approval.Level = props.workFlow.Approval.Level.filter(arr => props.workFlow.Approval.Level.indexOf(arr) !== props.index)
        props.setWorkFlow(obj)
    }

    const moveUp = () => {
        let obj = { ...props.workFlow }
        let temp = obj.Approval.Level[props.index]
        obj.Approval.Level[props.index] = obj.Approval.Level[props.index - 1]
        obj.Approval.Level[props.index - 1] = temp
        props.setWorkFlow(obj)
    }

    const moveDown = () => {
        let obj = { ...props.workFlow }
        let temp = obj.Approval.Level[props.index]
        obj.Approval.Level[props.index] = obj.Approval.Level[props.index + 1]
        obj.Approval.Level[props.index + 1] = temp
        props.setWorkFlow(obj)
    }


    const changeHandler = (e) => {
        const target = e.target
        const name = target.name
        let obj = { ...props.workFlow }
        obj.Approval.Level[props.index][name] = target.value
        props.setWorkFlow(obj)
        if (name === 'Approver') {
            let err = { ...error }
            let secondTime = false
            for (let ind in props.workFlow.Approval.Level) {
                let result = props.workFlow.Approval?.Level[ind][name] === target.value
                err.approverError[ind] = (result && secondTime)
                if (result && secondTime) {
                    err.message[ind] = 'User already in approver list'
                }
                if (props.workFlow.Approval?.Level[ind][name] === target.value) {
                    secondTime = true
                }
            }
            setError(err)
        }
        if (name === 'Amount') {
            let err = { ...error }
            for (let index in props.workFlow.Approval.Level) {
                err.amountError[index] = props.workFlow.Approval?.Level[Number(index) === 0 ? 0 : Number(index) - 1][name] > target.valueAsNumber
            }
            setError(err)
        }
        if (name === 'Percentage') {
            let err = { ...error }
            for (let index in props.workFlow.Approval.Level) {
                err.percentageError[index] = props.workFlow.Approval?.Level[Number(index) === 0 ? 0 : Number(index) - 1][name] > target.valueAsNumber
            }
            setError(err)
        }
        console.log(error.amountError, error.approverError, error.percentageError)
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
                            <label htmlFor={'Approver'} className="form-label">Approver</label>
                            <select name={'Approver'} id={'approver[' + props.index + ']'} value={props.workFlow.Approval.Level[props.index].Approver} onChange={changeHandler} className="form-select form-select-sm">
                                <option key={0} value={0}></option>
                                {
                                    props.users?.map(user => (
                                        <option key={user.Id} value={user.Id}>{`${user.FirstName} ${user.LastName}`}</option>
                                    ))
                                }
                            </select>
                            {error.approverError[props.index] ? <small key={props.index} className="text-danger">{error.message[props.index]}</small> : null}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor={'Amount'} className="form-label">Amount</label>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">$</span>
                                    <input name={'Amount'} id={'amount[' + props.index + ']'} type="number" className="form-control from-control-sm" value={props.workFlow.Approval.Level[props.index].Amount} onChange={changeHandler} />
                                    {/* {props.workFlow?.Approval?.Level[props.index === 0 ? 0 : props.index - 1]?.Amount > props.workFlow.Approval.Level[props.index]?.Amount ? <small key={props.index} className="text-danger">Amount must be greater than {props.workFlow.Approval.Level[props.index - 1]?.Amount}</small> : null} */}
                                </div>
                                {error.amountError[props.index] ? <small key={props.index} className="text-danger">Amount must be greater than {props.workFlow.Approval.Level[props.index - 1].Amount}</small> : null}
                            </div>
                        </div>
                        {
                            props.type === 1 ?
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor={'Percentage'} className="form-label">Percentage</label>
                                        <div className="input-group input-group-sm">
                                            <input name={'Percentage'} id={'percentage[' + props.index + ']'} type="number" maxLength={3} max={100} className="form-control from-control-sm" value={props.workFlow.Approval.Level[props.index].Percentage} onChange={changeHandler} />
                                            <span className="input-group-text">%</span>
                                        </div>
                                        {error.percentageError[props.index] ? <small key={props.index} className="text-danger">Percentage must be greater than {props.workFlow.Approval.Level[props.index - 1].Percentage}</small> : null}
                                    </div>
                                </div>
                                : null
                        }
                        <div className="col-4 align-self-end">
                            <div className="row">
                                <div className="col-6">{props.index !== 0 ? <button onClick={removeLevel} title="Delete" className="btn btn-active-light-danger btn-icon btn-sm btn-hover-rise">
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
                                </button> : null}
                                    {props.index === props.workFlow.Approval.Level.length - 1 ? <button onClick={addLevel} title="Add Level" className="btn btn-active-light-Primary btn-icon btn-sm  btn-hover-rise">
                                        <span className="svg-icon svg-icon-2 svg-icon-primary">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">
                                                <path opacity="0.3"
                                                    d="M3 13V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14H4C3.4 14 3 13.6 3 13Z"
                                                    fill="black" />
                                                <path
                                                    d="M13 21H11C10.4 21 10 20.6 10 20V4C10 3.4 10.4 3 11 3H13C13.6 3 14 3.4 14 4V20C14 20.6 13.6 21 13 21Z"
                                                    fill="black" />
                                            </svg>
                                        </span>
                                    </button> : null}
                                </div>
                                <div className="col-6 align-self-center">
                                    {
                                        props.index === 0 ?
                                            <span onClick={moveDown} role='button' className="svg-icon svg-icon-primary svg-icon-1 ms-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path opacity="0.5" d="M12.5657 9.63427L16.75 5.44995C17.1642 5.03574 17.8358 5.03574 18.25 5.44995C18.6642 5.86416 18.6642 6.53574 18.25 6.94995L12.7071 12.4928C12.3166 12.8834 11.6834 12.8834 11.2929 12.4928L5.75 6.94995C5.33579 6.53574 5.33579 5.86416 5.75 5.44995C6.16421 5.03574 6.83579 5.03574 7.25 5.44995L11.4343 9.63427C11.7467 9.94669 12.2533 9.94668 12.5657 9.63427Z" fill="black" />
                                                <path d="M12.5657 15.6343L16.75 11.45C17.1642 11.0357 17.8358 11.0357 18.25 11.45C18.6642 11.8642 18.6642 12.5357 18.25 12.95L12.7071 18.4928C12.3166 18.8834 11.6834 18.8834 11.2929 18.4928L5.75 12.95C5.33579 12.5357 5.33579 11.8642 5.75 11.45C6.16421 11.0357 6.83579 11.0357 7.25 11.45L11.4343 15.6343C11.7467 15.9467 12.2533 15.9467 12.5657 15.6343Z" fill="black" />
                                            </svg></span>
                                            :
                                            <>
                                                {
                                                    props.index === props.workFlow.Approval.Level.length - 1 ?
                                                        <span onClick={moveUp} role='button' className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.5" d="M11.4343 14.3657L7.25 18.55C6.83579 18.9643 6.16421 18.9643 5.75 18.55C5.33579 18.1358 5.33579 17.4643 5.75 17.05L11.2929 11.5072C11.6834 11.1166 12.3166 11.1166 12.7071 11.5072L18.25 17.05C18.6642 17.4643 18.6642 18.1358 18.25 18.55C17.8358 18.9643 17.1642 18.9643 16.75 18.55L12.5657 14.3657C12.2533 14.0533 11.7467 14.0533 11.4343 14.3657Z" fill="black" />
                                                            <path d="M11.4343 8.36573L7.25 12.55C6.83579 12.9643 6.16421 12.9643 5.75 12.55C5.33579 12.1358 5.33579 11.4643 5.75 11.05L11.2929 5.50716C11.6834 5.11663 12.3166 5.11663 12.7071 5.50715L18.25 11.05C18.6642 11.4643 18.6642 12.1358 18.25 12.55C17.8358 12.9643 17.1642 12.9643 16.75 12.55L12.5657 8.36573C12.2533 8.05331 11.7467 8.05332 11.4343 8.36573Z" fill="black" />
                                                        </svg></span>
                                                        :
                                                        <>
                                                            <span onClick={moveUp} role='button' className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.5" d="M11.4343 14.3657L7.25 18.55C6.83579 18.9643 6.16421 18.9643 5.75 18.55C5.33579 18.1358 5.33579 17.4643 5.75 17.05L11.2929 11.5072C11.6834 11.1166 12.3166 11.1166 12.7071 11.5072L18.25 17.05C18.6642 17.4643 18.6642 18.1358 18.25 18.55C17.8358 18.9643 17.1642 18.9643 16.75 18.55L12.5657 14.3657C12.2533 14.0533 11.7467 14.0533 11.4343 14.3657Z" fill="black" />
                                                                <path d="M11.4343 8.36573L7.25 12.55C6.83579 12.9643 6.16421 12.9643 5.75 12.55C5.33579 12.1358 5.33579 11.4643 5.75 11.05L11.2929 5.50716C11.6834 5.11663 12.3166 5.11663 12.7071 5.50715L18.25 11.05C18.6642 11.4643 18.6642 12.1358 18.25 12.55C17.8358 12.9643 17.1642 12.9643 16.75 12.55L12.5657 8.36573C12.2533 8.05331 11.7467 8.05332 11.4343 8.36573Z" fill="black" />
                                                            </svg></span>
                                                            <span onClick={moveDown} role='button' className="svg-icon svg-icon-primary svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path opacity="0.5" d="M12.5657 9.63427L16.75 5.44995C17.1642 5.03574 17.8358 5.03574 18.25 5.44995C18.6642 5.86416 18.6642 6.53574 18.25 6.94995L12.7071 12.4928C12.3166 12.8834 11.6834 12.8834 11.2929 12.4928L5.75 6.94995C5.33579 6.53574 5.33579 5.86416 5.75 5.44995C6.16421 5.03574 6.83579 5.03574 7.25 5.44995L11.4343 9.63427C11.7467 9.94669 12.2533 9.94668 12.5657 9.63427Z" fill="black" />
                                                                <path d="M12.5657 15.6343L16.75 11.45C17.1642 11.0357 17.8358 11.0357 18.25 11.45C18.6642 11.8642 18.6642 12.5357 18.25 12.95L12.7071 18.4928C12.3166 18.8834 11.6834 18.8834 11.2929 18.4928L5.75 12.95C5.33579 12.5357 5.33579 11.8642 5.75 11.45C6.16421 11.0357 6.83579 11.0357 7.25 11.45L11.4343 15.6343C11.7467 15.9467 12.2533 15.9467 12.5657 15.6343Z" fill="black" />
                                                            </svg></span>
                                                        </>

                                                }
                                            </>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="separator border-1 border-light my-2"></div>
            </div>
        </>
    )
}