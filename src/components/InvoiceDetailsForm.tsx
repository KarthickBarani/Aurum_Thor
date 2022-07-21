
import { useEffect, useState } from "react"
import { invDetailsType, vendors, departments, locations, subsidiary, userProfileType, NextApprovers, expensesType, ApprovalHistory } from '../components/Interface'
import moment from "moment"
import axios from "axios"
import { SweetAlertIcon } from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { InputSelectField, InputTextAreaField, InputTextDateField, InputTextField } from "./InputField"
import { AddSvg, DollarSvg, RecallSvg, ViewSvg } from "../Svg/Svg"
import { SweetAlert } from "../Function/alert"

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
        }
        if (props.invDetails.TotalAmount !== (props.invDetails.TaxTotal + props.exSubtotal + props.POSubtotal)) {
            return SweetAlert({
                title: 'Invoice Error',
                icon: 'info',
                text: 'Invoice Amount must be equal to the sum of Expenses Amount, PO Amount, Tax Amount'
            })
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
                        title: `<h1>${Action}</h1>`,
                        icon: MessageType,
                    })
                    navigation('/Home')
                } else {
                    SweetAlert({
                        title: `<h1>${res.data.Message}</h1>`,
                        text: `${res.data.Message}`,
                        icon: 'error',
                    })
                }
            })
        props.refetch()
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
                                value={props.invDetails.VendorId}
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
                            value={props.invDetails.VendorCode}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                        />
                    </div>
                    <div className="col col-lg-6">
                        <div className="form-group text-start">
                            <InputSelectField
                                label="Remit To"
                                id='VendorId' name='VendorId'
                                className={formSelect}
                                value={props.invDetails.VendorId}
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
                                value={`${props.invDetails.VendorAddress?.split(',')[0]}`}
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
                                value={`${props.invDetails.VendorAddress?.split(',')[1]} ${props.invDetails.VendorAddress?.split(',')[2]} ${props.invDetails.VendorAddress?.split(',')[3]}`}
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
                                value={`${props.invDetails.VendorAddress?.split(',')[4]}`}
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
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[0]}`}
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
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[1]} ${props.invDetails.RemittanceAddress?.split(',')[2]} ${props.invDetails.RemittanceAddress?.split(',')[3]}`}
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
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[4]}`}
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
                                value={props.invDetails.PurchaseNumber}
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
                                value={props.invDetails.PurchaseNumber}
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
                                            <button onClick={() => {
                                                if (props.invDetails.TotalAmount !== (props.invDetails.TaxTotal + props.exSubtotal + props.POSubtotal)) {
                                                    return SweetAlert(
                                                        {
                                                            title: 'Invoice Error',
                                                            icon: 'info',
                                                            text: 'Invoice Amount must be equal to the sum of Expenses Amount, PO Amount, Tax Amount'
                                                        }
                                                    )
                                                }
                                                Submit(0, 'Submit', 'success')
                                            }} type="button" className="btn btn-light-primary btn-sm m-2">Submit Approval
                                            </button>
                                            :
                                            props.invDetails?.StatusId === 2 || props.invDetails?.StatusId === 3 || props.invDetails?.StatusId === 4
                                                ?
                                                <>
                                                    <button onClick={() => Submit(4, 'Approved', 'success')} type={'button'} className="btn btn-light-success btn-sm m-2">Approved
                                                        <span className="svg-icon svg-icon svg-icon-1"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.3"
                                                                d="M10 18C9.7 18 9.5 17.9 9.3 17.7L2.3 10.7C1.9 10.3 1.9 9.7 2.3 9.3C2.7 8.9 3.29999 8.9 3.69999 9.3L10.7 16.3C11.1 16.7 11.1 17.3 10.7 17.7C10.5 17.9 10.3 18 10 18Z"
                                                                fill="black" />
                                                            <path
                                                                d="M10 18C9.7 18 9.5 17.9 9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L20.3 5.3C20.7 4.9 21.3 4.9 21.7 5.3C22.1 5.7 22.1 6.30002 21.7 6.70002L10.7 17.7C10.5 17.9 10.3 18 10 18Z"
                                                                fill="black" />
                                                        </svg></span>
                                                    </button>
                                                    <button onClick={() => Submit(5, 'Not Approved', 'warning')
                                                    } type={'button'} className="btn btn-light-warning btn-sm my-2">Not
                                                        Approved <span className="svg-icon svg-icon-1"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none">
                                                            <path opacity="0.3"
                                                                d="M6.7 19.4L5.3 18C4.9 17.6 4.9 17 5.3 16.6L16.6 5.3C17 4.9 17.6 4.9 18 5.3L19.4 6.7C19.8 7.1 19.8 7.7 19.4 8.1L8.1 19.4C7.8 19.8 7.1 19.8 6.7 19.4Z"
                                                                fill="black" />
                                                            <path
                                                                d="M19.5 18L18.1 19.4C17.7 19.8 17.1 19.8 16.7 19.4L5.40001 8.1C5.00001 7.7 5.00001 7.1 5.40001 6.7L6.80001 5.3C7.20001 4.9 7.80001 4.9 8.20001 5.3L19.5 16.6C19.9 16.9 19.9 17.6 19.5 18Z"
                                                                fill="black" />
                                                        </svg>
                                                        </span>
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
                                    <button type="button" title="Add" className="btn btn-icon-primary" data-bs-toggle={"modal"} data-bs-target="#kt_modal_1"><span
                                        className="svg-icon svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3"
                                                d="M3 13V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14H4C3.4 14 3 13.6 3 13Z"
                                                fill="black" />
                                            <path
                                                d="M13 21H11C10.4 21 10 20.6 10 20V4C10 3.4 10.4 3 11 3H13C13.6 3 14 3.4 14 4V20C14 20.6 13.6 21 13 21Z"
                                                fill="black" />
                                        </svg></span>
                                    </button>
                                    <button title="Delete" className="btn btn-icon-danger"
                                        data-bstoggle="tooltip"><span className="svg-icon svg-icon-2"><svg
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