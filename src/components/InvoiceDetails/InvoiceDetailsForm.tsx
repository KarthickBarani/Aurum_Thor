
import { useEffect, useState } from "react"
import { invDetailsType, vendors, departments, locations, subsidiary, userProfileType, NextApprovers, expensesType, ApprovalHistory } from '../Interface/Interface'
import moment from "moment"
import axios from "axios"
import { SweetAlertIcon } from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { InputSelectField, InputTextAreaField, InputTextDateField, InputTextField } from "../components/InputField"
import { AddSvg, CancelSvg, DollarSvg, DoubleTickSvg, RecallSvg, RemoveSvg, ViewSvg } from "../Svg/Svg"
import { SweetAlert } from "../../Function/alert"

export const InvoiceDetailsForm = (props:
    {
        invNumber: number
        invDetails: invDetailsType
        exSubtotal: number
        POSubtotal: number
        subsidiaries: subsidiary
        setInvDetails: Function
        vendors: vendors
        departments: departments
        locations: locations
        nextApprovers: NextApprovers[]
        users: userProfileType[]
        userid: number
        formError: any
        setFormError: Function
        setValid: Function
        refetch: Function
        approvalHistory: ApprovalHistory[]
    }
) => {

    const [comment, setComment] = useState<string>('')
    const [commentError, setCommentError] = useState<string | null>(null)
    const [subsidiary, setSubsidiary] = useState<number>(0)
    const [invoiceDate, setInvoiceDate] = useState<string>('')
    const [dueDate, setDueDate] = useState<string>('')

    const navigation = useNavigate()

    const Submit = (Status: number, Action: string, MessageType: SweetAlertIcon) => {
        if (Status === 5) {
            if (comment === '') {
                return SweetAlert({
                    title: 'Message',
                    text: 'Comment Required!',
                    icon: 'info'
                })
            }
        } else {
            if (props.invDetails.TotalAmount !== (props.invDetails.TaxTotal + props.exSubtotal + props.POSubtotal)) {
                return SweetAlert({
                    title: 'Invoice Error',
                    icon: 'info',
                    text: 'Invoice Amount must be equal to the sum of Expenses Amount, PO Amount, Tax Amount'
                })
            }
        }
        axios.post(`https://invoiceprocessingapi.azurewebsites.net/api/v1/Invoice/Submit/${props.invNumber}/${props.userid}`, {
            StatusId: Status,
            Comments: comment,
            NextApproverId: props.nextApprovers.length === 0 ? null : props.nextApprovers.filter(arr => arr.Status === 3 || arr.Status === 0)[0]?.ApproverId
        })
            .then((res) => {
                console.log(res)
                if (res.data.Status) {
                    SweetAlert({
                        icon: MessageType,
                        title: Action,
                    })
                    navigation('/Home')
                    props.refetch()
                } else {
                    SweetAlert({
                        title: `<h1>${res.data.Message}</h1>`,
                        text: `${res.data.Message}`,
                        icon: 'error',
                    })
                }
            })
            .catch(() => {
                SweetAlert({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })

    }

    useEffect(() => {
        const ind = props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails.VendorId))
        const currentVendor = props.vendors[ind]
        props.setInvDetails({
            ...props.invDetails,
            VendorName: currentVendor?.VendorName,
            VendorCode: currentVendor?.VendorCode,
            VendorAddress: currentVendor?.VendorAddressLine1 + ',' + currentVendor?.VendorCity + ',' + currentVendor?.VendorZipCode + ',' + currentVendor?.VendorState + ',' + currentVendor?.VendorCountry,
            RemittanceAddress: currentVendor?.RemitAddressLine1 + ',' + currentVendor?.RemitCity + ',' + currentVendor?.RemitZipCode + ',' + currentVendor?.RemitState + ',' + currentVendor?.RemitCountry,
        })
        setSubsidiary(currentVendor?.SubsidiaryId)
        setInvoiceDate(moment(new Date(props.invDetails.InvoiceDate)).format('MM-DD-YYYY'))
        setDueDate(moment(new Date(props.invDetails.DueDate)).format('MM-DD-YYYY'))

    }, [props.invDetails.VendorId])

    const changeHandler = e => {
        const target = e.target
        const name = target.name
        const obj = { ...props.invDetails }
        if (target.type === 'number') {
            obj[name] = target.valueAsNumber
            console.log(target.value)
            props.setInvDetails(obj)
        }
        if (target.name === 'DueDate')
            setDueDate(target.value)
        if (target.name === 'InvoiceDate')
            setInvoiceDate(target.value)
        obj[name] = target.value
        props.setInvDetails(obj)
        switch (name) {
            case 'InvoiceNumber':
                if (target.value === '')
                    props.setFormError({ ...props.formError, [name]: 'Required !' })
                else
                    props.setFormError({ ...props.formError, [name]: null })
                break
            case 'TotalAmount':
                if (target.value === '')
                    props.setFormError({ ...props.formError, [name]: 'Required !' })
                else
                    props.setFormError({ ...props.formError, [name]: null })
                break
            case 'VendorId':
                if (target.value === '0')
                    props.setFormError({ ...props.formError, [name]: 'Required !' })
                else
                    props.setFormError({ ...props.formError, [name]: null })
                break
            default:
                break
        }
    }

    const blurHandler = e => {
        const target = e.target
        const name = target.name
        const obj = { ...props.invDetails }
        if (target.type === 'number') {
            obj[name] = Number(Number(target.valueAsNumber).toFixed(2))
        }
        props.setInvDetails(obj)
        console.log(target.value)
        let date
        switch (name) {
            case 'DueDate':
                date = new Date(dueDate)
                if (dueDate === 'MM-DD-YYYY')
                    props.setFormError({ ...props.formError, [name]: null })
                else if (date.toString() === 'Invalid Date')
                    props.setFormError({ ...props.formError, [name]: 'Invalid Date' })
                else
                    props.setFormError({ ...props.formError, [name]: null })
                break
            case 'InvoiceDate':
                date = new Date(invoiceDate)
                if (invoiceDate === 'MM-DD-YYYY')
                    props.setFormError({ ...props.formError, [name]: 'Required !' })
                else if (date.toString() === 'Invalid Date')
                    props.setFormError({ ...props.formError, [name]: 'Invalid Date' })
                else
                    props.setFormError({ ...props.formError, [name]: null })
                break
            default:
                break
        }
        if (target.name === 'DueDate')
            return props.setInvDetails({ ...props.invDetails, [name]: new Date(target.value) })
        if (target.name === 'InvoiceDate')
            return props.setInvDetails({ ...props.invDetails, [name]: new Date(target.value) })
    }

    const test = () => {
        let loginUser = props.users.find(arr => arr.Id === props.userid)?.LastName + ', ' + props.users.find(arr => arr.Id === props.userid)?.FirstName
        return props.approvalHistory.find(arr => arr.ApproverName === loginUser)?.Status === 4 ? true : false
    }

    const formInput = 'form-control form-control-solid'
    const formSelect = 'form-select form-select-solid'
    const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2'


    return (
        < form>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8 col-lg-4">
                        <div className="form-group">
                            <InputSelectField
                                label="Vendor Name"
                                id='VendorId'
                                name='VendorId'
                                className={formSelect}
                                value={props.invDetails?.VendorId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.vendors.map(vendor => { return { id: vendor.VendorId, value: vendor.VendorName } })}
                                formError={props.formError}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-2">
                        <InputTextField
                            label='Vendor Code'
                            type="text"
                            id="VenderCode"
                            name="VenderCode"
                            className={formInput}
                            value={props.invDetails?.VendorCode ? props.invDetails?.VendorCode : ''}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            readOnly={true}
                        />
                    </div>
                    <div className="col col-lg-6">
                        <div className="form-group text-start">
                            <InputSelectField
                                label="Remit To"
                                id='VendorId' name='VendorId'
                                className={formSelect}
                                value={props.invDetails?.VendorId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.vendors.map(vendor => { return { id: vendor.VendorId, value: vendor.VendorName } })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputTextField
                                label='Vendor Address line 1'
                                type="text"
                                id="VenderAddress"
                                name="VenderAddress"
                                className={formInput}
                                value={`${props.invDetails?.VendorAddress?.split(',')[0] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[0]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                            <InputTextField
                                label='Vendor Address line 2'
                                type="text"
                                id="VenderAddress"
                                name="VenderAddress"
                                className={formInput}
                                value={`${props.invDetails?.VendorAddress?.split(',')[1] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[1]} ${props.invDetails?.VendorAddress?.split(',')[2] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[2]} ${props.invDetails?.VendorAddress?.split(',')[3] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[3]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                            <InputTextField
                                label='Vendor Address line 3'
                                type="text"
                                id="VenderAddress"
                                name="VenderAddress"
                                className={formInput}
                                value={`${props.invDetails?.VendorAddress?.split(',')[4] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[4]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputTextField
                                label='Remit Address line 1'
                                type="text"
                                id="RemittanceAddress"
                                name="RemittanceAddress"
                                className={formInput}
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[0] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[0]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                            <InputTextField
                                label='Remit Address line 2'
                                type="text"
                                id="RemittanceAddress"
                                name="RemittanceAddress"
                                className={formInput}
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[1] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[1]} ${props.invDetails?.RemittanceAddress?.split(',')[2] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[2]} ${props.invDetails?.RemittanceAddress?.split(',')[3] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[3]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                            <InputTextField
                                label='Remit Address line 3'
                                type="text"
                                id="RemittanceAddress"
                                name="RemittanceAddress"
                                className={formInput}
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[4] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[4]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputSelectField
                                label="Subsidiary"
                                id='Subsidiary'
                                name='Subsidiary'
                                className={formSelect}
                                value={subsidiary}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.subsidiaries.map(sub => { return { id: sub.SubsidiaryId, value: sub.Name } })}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group ">
                            <InputSelectField
                                label="Department"
                                id='DepartmentId'
                                name='DepartmentId'
                                className={formSelect}
                                value={props.invDetails.DepartmentId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.departments.map(dept => { return { id: dept.DepartmentId, value: dept.DepartmentName } })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputSelectField
                                label="PO Number"
                                id='PurchaseNumber'
                                name='PurchaseNumber'
                                className={formSelect}
                                value={0}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={[]}
                                icon={<RecallSvg role="button" clsName="svg-icon svg-icon-1 svg-icon-primary" />}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputSelectField
                                label="Location"
                                id='LocationId'
                                name='LocationId'
                                className={formSelect}
                                value={props.invDetails.LocationId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.locations.map(location => { return { id: location.LocationId, value: location.Location } })}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-lg-3">
                        <div className="d-flex flex-column">
                            <InputTextField
                                label='Invoice Number'
                                type="text"
                                id="InvoiceNumber"
                                name="InvoiceNumber"
                                className={formInput}
                                value={props.invDetails.InvoiceNumber}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                required={true}
                                formError={props.formError}
                            />
                            <div className="form-check d-flex gap-2">
                                <input type="checkbox" id="creditMemo" name="creditMemo" className="form-check form-check-sm form-check-solid mt-5" />
                                <label htmlFor="creditMemo"
                                    className={"form-check-label mt-5 fw-bolder fs-6 gray-700"}>Credit
                                    Memo ?
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="form-group">
                            <InputTextDateField
                                label='Invoice Date'
                                id={'InvoiceDate'}
                                name={'InvoiceDate'}
                                className="form-control form-control-solid"
                                value={invoiceDate}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                formError={props.formError}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className=" col-sm-6 col-lg-3">
                        <div className="form-group">
                            <InputTextField
                                label='Posting Period'
                                type="text"
                                id="PurchaseNumber"
                                name="PurchaseNumber"
                                className={formInput}
                                value={props.invDetails.PurchaseNumber ? props.invDetails.PurchaseNumber : ''}
                                onChange={changeHandler}
                                onBlur={blurHandler} />
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="form-group">
                            <InputTextDateField
                                label='Due Date'
                                id={'DueDate'}
                                name={'DueDate'}
                                className="form-control form-control-solid"
                                value={dueDate}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                formError={props.formError}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="form-group">
                            <InputTextField
                                label='Invoice Amount'
                                type="number"
                                id="TotalAmount"
                                name="TotalAmount"
                                className={formInput}
                                value={props.invDetails.TotalAmount}
                                onChange={changeHandler} onBlur={blurHandler}
                                icon={<DollarSvg clsName="svg-icon svg-icon-1" role="none" />}
                                formError={props.formError}
                                required={true}
                            />
                            <div className="input-group input-group-solid">
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <div className="row">
                            <div className="col-6"><div className="form-group">
                                <InputTextField
                                    label='Currency'
                                    type="text"
                                    id="Currency"
                                    name="Currency"
                                    className={formInput}
                                    value={'USD'}
                                    onChange={changeHandler}
                                    onBlur={blurHandler}
                                    readOnly={true} />
                            </div></div>
                            <div className="col-6">
                                <div className="form-group">
                                    <InputTextField
                                        label='Tax'
                                        type="number"
                                        id="TaxTotal"
                                        name="TaxTotal"
                                        className={formInput}
                                        value={props.invDetails.TaxTotal}
                                        onChange={changeHandler}
                                        onBlur={blurHandler}
                                        icon={<DollarSvg clsName="svg-icon  svg-icon-1" role="none" />}
                                        formError={props.formError}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <InputTextField
                            label='Expenses Subtotal'
                            type="number"
                            id="exSubtotal"
                            name="exSubtotal"
                            className={formInput}
                            value={props.exSubtotal.toFixed(2)}
                            readOnly={true}
                            icon={<DollarSvg clsName="svg-icon  svg-icon-1" role="none" />}
                        />
                    </div>
                    <div className="col-lg-3">
                        <InputTextField
                            label='PO Subtotal'
                            type="number"
                            id="POSubtotal"
                            name="POSubtotal"
                            className={formInput}
                            value={props.POSubtotal.toFixed(2)}
                            readOnly={true}
                            icon={<DollarSvg clsName="svg-icon svg-icon-1" role="none" />}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputTextField
                                label='Memo'
                                type="text"
                                id="Memo"
                                name="Memo"
                                className={formInput}
                                value={''}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex flex-column">
                            <div className="form-group w-100">
                                <InputTextAreaField
                                    label='Comments'
                                    id="Comments"
                                    name="Comments"
                                    className={formInput}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    onBlur={blurHandler}
                                    formError={commentError}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex flex-stack">
                                {(props.invDetails.StatusId === 3 || props.invDetails.StatusId === 2) ? <label htmlFor="approver" className={formLabel}>Next Approvers</label> : null}
                                {(props.invDetails.StatusId === 3 || props.invDetails.StatusId === 2) ? <button type={'button'} className="align-self-start btn btn-icon btn-sm btn-hover-rise" data-bs-toggle="modal" data-bs-target="#level" >
                                    <AddSvg
                                        clsName="svg-icon svg-icon-2 svg-icon-primary"
                                    />
                                </button>
                                    :
                                    null}

                            </div>
                            <ul className="list-group list-group-flush hover-scroll h-100px">

                                {
                                    (props.invDetails.StatusId === 3 || props.invDetails.StatusId === 2)
                                        ?
                                        props.nextApprovers.filter(arr => arr.Status === 3 || arr.Status === 0)
                                            .map((user, index) => (
                                                <li key={index} className="list-group-item list-group-item-action fw-bold fs-6">{user.ApproverName}</li>
                                            ))
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-end">
                                {
                                    test() ?
                                        null
                                        :
                                        props.invDetails?.StatusId === 1 || props.invDetails?.StatusId === 5
                                            ?
                                            <button onClick={() => Submit(0, 'Submit', 'success')} type="button" className="btn btn-light-primary btn-sm m-2">Submit Approval
                                            </button>
                                            :
                                            props.invDetails?.StatusId === 2 || props.invDetails?.StatusId === 3 || props.invDetails?.StatusId === 4
                                                ?
                                                <>
                                                    <button onClick={() => Submit(4, 'Approved', 'success')} type={'button'} className="btn btn-light-success btn-sm m-2">Approved
                                                        <DoubleTickSvg clsName="svg-icon svg-icon svg-icon-1" />
                                                    </button>
                                                    <button onClick={() => Submit(5, 'Not Approved', 'warning')
                                                    } type={'button'} className="btn btn-light-warning btn-sm my-2">Not
                                                        Approved
                                                        <CancelSvg clsName="svg-icon svg-icon-1" />
                                                    </button>
                                                </>
                                                :
                                                null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <div className="d-flex flex-stack">
                                <label className={formLabel}>Attachments</label>
                                <div>
                                    <button type="button" title="Add" className="btn btn-icon-primary" data-bs-toggle={"modal"} data-bs-target="#kt_modal_1">
                                        <AddSvg clsName="svg-icon svg-icon-primary svg-icon-2" />
                                    </button>
                                    <button title="Delete" className="btn btn-icon-danger"
                                        data-bstoggle="tooltip">
                                        <RemoveSvg clsName="svg-icon svg-icon-2" />
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped gy-3 gs-7 p-2 table-rounded">
                                    <thead >
                                        <tr className="fw-bolder fs-6 text-gray-800 border-bottom-2 border-gray-200">
                                            <th><div className="form-check form-check-custom form-check-solid form-check-sm">
                                                <input className="form-check-input" type="checkbox" />
                                            </div></th>
                                            <th>Action</th>
                                            <th>Description</th>
                                            <th>File Name</th>
                                            <th>Attached By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><div className="form-check form-check-custom form-check-solid form-check-sm">
                                                <input className="form-check-input" type="checkbox" />
                                            </div></td>
                                            <td>{<ViewSvg role="button" clsName="svg-icon svg-icon-primary svg-icon-1" />}</td>
                                            <td>Milestone 1: At delivery of discovery summary document</td>
                                            <td>invoice0038.pdf</td>
                                            <td>peter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    )
}