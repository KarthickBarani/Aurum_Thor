import { useState } from "react"
import { LevelElementError, userProfileType, WorkFlowLevel, WorkFlowTableType } from "../Interface/Interface"
import { AddSvg, DownDoubleArrowSvg, RemoveSvg, UpDoubleArrowSvg } from "../Svg/Svg"

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
            Level: props.workFlow.Approval.Level.length + 1,
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
                            props.workFlow.WorkFlowTypeId === 1 ?
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
                                    <RemoveSvg clsName="svg-icon svg-icon-2 svg-icon-danger" />
                                </button> : null}
                                    {props.index === props.workFlow.Approval.Level.length - 1 ? <button onClick={addLevel} title="Add Level" className="btn btn-active-light-Primary btn-icon btn-sm  btn-hover-rise">
                                        <AddSvg clsName="svg-icon svg-icon-2 svg-icon-primary" />
                                    </button> : null}
                                </div>
                                <div className="col-6 align-self-center">
                                    {
                                        props.index === 0 ?
                                            <DownDoubleArrowSvg clsName="svg-icon svg-icon-primary svg-icon-1 ms-auto" function={moveDown} />
                                            :
                                            <>
                                                {
                                                    props.index === props.workFlow.Approval.Level.length - 1 ?
                                                        <UpDoubleArrowSvg clsName="svg-icon svg-icon-primary svg-icon-1 ms-auto" function={moveUp} />
                                                        :
                                                        <>
                                                            <UpDoubleArrowSvg clsName="svg-icon svg-icon-primary svg-icon-1 ms-auto" function={moveUp} />
                                                            <DownDoubleArrowSvg clsName="svg-icon svg-icon-primary svg-icon-1 ms-auto" function={moveDown} />
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