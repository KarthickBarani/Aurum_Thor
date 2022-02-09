export const LevelElement = (props: {
    levelElements: number[]
    index: number
    setLevelElements: Function
}) => {


    const removeLevel = () => {
        let delarr = props.levelElements.filter(arr => props.levelElements.indexOf(arr) !== props.index)
        props.setLevelElements(delarr)
        console.log(delarr)
    }

    return (
        <>
            <div className="row my-2">
                <div className="col">
                    <div className="separator separator-content border-5 border-gray my-5"><span className="min-w-50px text-gray-800 fw-bolder">Level-{props.index + 1}</span></div>
                </div>
            </div>

            <div className="row my-2">
                <div className="col-3">
                    <label htmlFor="approver" className="form-label">Approver</label>
                    <select name="approver" id="approver" className="form-select form-select-sm"></select>
                </div>
                <div className="col-3">
                    <div className="from-group d-flex flex-column">
                        <label className="form-label">Option</label>
                        <div className="nav nav-tab btn-group btn-group-sm" role='tablist' aria-label="Basic example">
                            <button role='tab' type="button" data-bs-toggle="tab" data-bs-target={'#amount' + props.index + 1} className="btn btn-light-primary active">Amount</button>
                            <button role='tab' type="button" data-bs-toggle="tab" data-bs-target={'#percentage' + props.index + 1} className="btn btn-light-primary">Percentage</button>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id={'amount' + props.index + 1} role="tabpanel">

                            <label htmlFor="amount" className="form-label">Amount</label>
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">$</span>
                                <input name="amount" id="amount" type="number" className="form-control from-control-sm" />
                            </div>

                        </div>
                        <div className="tab-pane fade" id={'percentage' + props.index + 1} role="tabpanel">

                            <label htmlFor="percentage" className="form-label">Percentage</label>
                            <div className="input-group input-group-sm">
                                <input name="percentage" id="percentage" type="text" min={0} max={100} maxLength={3} className="form-control from-control-sm" />
                                <span className="input-group-text">%</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-3 align-self-end">
                    <button onClick={removeLevel} className="btn btn-light-danger btn-sm">Remove</button>
                </div>
            </div>
        </>
    )
}