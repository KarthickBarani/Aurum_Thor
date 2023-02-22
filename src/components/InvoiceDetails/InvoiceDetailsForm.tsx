
import { useContext, useEffect, useState } from "react"
import { invDetailsType, vendors, departments, locations, subsidiary, userProfileType, NextApprovers, expensesType, ApprovalHistoryProps } from '../Interface/Interface'
import moment from "moment"
import axios from "axios"
import { SweetAlertIcon } from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { InputSelectField, InputTextAreaField, InputTextDateField, InputTextField } from "../components/InputField"
import { AddSvg, CancelSvg, DollarSvg, DoubleTickSvg, RecallSvg, RemoveSvg, ViewSvg } from "../Svg/Svg"
import { SweetAlert } from "../../Function/alert"
import { axiosGet, AxiosGet, axiosPost } from "../../helpers/Axios"
import { PermissionContext } from "../../router/Router"
import { Field } from "formik"


export const InvoiceDetailsForm = (props:
    {
        invNumber: number
        invDetails: invDetailsType
        exSubtotal: number
        POSubtotal: number
        subsidiaries: subsidiary
        setInvDetails: Function
        vendors: vendors[]
        departments: departments
        locations: locations
        nextApprovers: NextApprovers[]
        users: userProfileType[]
        userid: number
        formError: any
        setFormError: Function
        setValid: Function
        approvalHistory: ApprovalHistoryProps[]
    }
) => {

    const CurrentPermission = useContext(PermissionContext)

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
        axiosPost(`/Invoice/Submit/${props.invNumber}/${props.userid}`, {
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
        console.log('Submit', {
            StatusId: Status,
            Comments: comment,
            NextApproverId: props.nextApprovers.length === 0 ? null : props.nextApprovers.filter(arr => arr.Status === 3 || arr.Status === 0)[0]?.ApproverId
        })

    }

    useEffect(() => {
        axiosGet(`/Vendor/Address/${props.invDetails.VendorId}`)
            .then(res => {
                props.setInvDetails({
                    ...props.invDetails,
                    VendorName: res.data.Vendor.VendorName,
                    VendorCode: res.data?.Vendor.VendorCode,
                    VendorAddress: res.data.AddressList[0]?.AddressLine1 + ',' + res.data.AddressList[0]?.City + ',' + res.data.AddressList[0]?.ZipCode + ',' + res.data.AddressList[0]?.State + ',' + res.data.AddressList[0]?.Country,
                    RemittanceAddress: res.data.AddressList[1]?.AddressLine1 + ',' + res.data.AddressList[1]?.City + ',' + res.data.AddressList[1]?.ZipCode + ',' + res.data.AddressList[1]?.State + ',' + res.data.AddressList[1]?.Country,
                })
            })
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
        if (target.name === 'Subsidiary')
            setSubsidiary(target.value)
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

    const accessMethod = (pageName: string, sectionName: string, fieldName: string): any => {
        if (CurrentPermission && CurrentPermission?.permission.Permission.length > 0)
            return CurrentPermission?.permission.Permission.find(permission => permission.Name === pageName)?.Sections.find(section => section.Field.Type === sectionName).Field.Value.find(value => value.Field === fieldName).Operation
        else
            return true
    }

    console.log(CurrentPermission?.permission)
    const formInput = 'form-control form-control-sm form-control-solid '
    const formSelect = 'form-select form-select-sm form-select-solid '
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
                                className={formSelect + ` ${accessMethod('Invoice', 'Header', 'VendorName').Update ? '' : 'form-select-transparent'}`}
                                value={props.invDetails?.VendorId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.vendors.map(vendor => { return { id: vendor.VendorId, value: vendor.VendorName } })}
                                formError={props.formError}
                                required={true}
                                disabled={!(accessMethod('Invoice', 'Header', 'VendorName').Update)}

                            />
                        </div>
                    </div>
                    <div className="col-sm-4 col-lg-2">
                        <InputTextField
                            label='Vendor Code'
                            type="text"
                            id="VendorCode"
                            name="VendorCode"
                            className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                            value={props.invDetails?.VendorCode ? props.invDetails?.VendorCode : ''}
                            onChange={changeHandler}
                            onBlur={blurHandler}
                            readOnly={true}
                            disabled={true}
                        />
                    </div>
                    <div className="col col-lg-6">
                        <div className="form-group text-start">
                            <InputSelectField
                                label="Remit To"
                                id='VendorId'
                                name='VendorId'
                                className={formSelect + ` ${false ? '' : 'form-select-transparent'}`}
                                value={props.invDetails?.VendorId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.vendors.map(vendor => { return { id: vendor.VendorId, value: vendor.VendorName } })}
                                disabled={true}
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
                                id="VendorAddress"
                                name="VendorAddress"
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={`${props.invDetails?.VendorAddress?.split(',')[0] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[0]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
                            />
                            <InputTextField
                                label='Vendor Address line 2'
                                type="text"
                                id="VendorAddress"
                                name="VendorAddress"
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={`${props.invDetails?.VendorAddress?.split(',')[1] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[1]} ${props.invDetails?.VendorAddress?.split(',')[2] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[2]} ${props.invDetails?.VendorAddress?.split(',')[3] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[3]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
                            />
                            <InputTextField
                                label='Vendor Address line 3'
                                type="text"
                                id="VendorAddress"
                                name="VendorAddress"
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={`${props.invDetails?.VendorAddress?.split(',')[4] === 'undefined' ? '' : props.invDetails?.VendorAddress?.split(',')[4]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
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
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[0] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[0]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
                            />
                            <InputTextField
                                label='Remit Address line 2'
                                type="text"
                                id="RemittanceAddress"
                                name="RemittanceAddress"
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[1] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[1]} ${props.invDetails?.RemittanceAddress?.split(',')[2] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[2]} ${props.invDetails?.RemittanceAddress?.split(',')[3] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[3]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
                            />
                            <InputTextField
                                label='Remit Address line 3'
                                type="text"
                                id="RemittanceAddress"
                                name="RemittanceAddress"
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={`${props.invDetails?.RemittanceAddress?.split(',')[4] === 'undefined' ? '' : props.invDetails?.RemittanceAddress?.split(',')[4]}`}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
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
                                className={formSelect + ` ${false ? '' : 'form-select-transparent'} `}
                                value={subsidiary}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.subsidiaries.map(sub => { return { id: sub.SubsidiaryId, value: sub.Name } })}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group ">
                            <InputSelectField
                                label="Department"
                                id='DepartmentId'
                                name='DepartmentId'
                                className={formSelect + ` ${false ? '' : 'form-select-transparent'}`}
                                value={props.invDetails.DepartmentId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.departments.map(dept => { return { id: dept.DepartmentId, value: dept.DepartmentName } })}
                                disabled={true}
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
                                className={formSelect + ` ${false ? '' : 'form-select-transparent'} `}
                                value={0}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={[]}
                                icon={<RecallSvg role="button" clsName="svg-icon svg-icon-1 svg-icon-primary" />}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <InputSelectField
                                label="Location"
                                id='LocationId'
                                name='LocationId'
                                className={formSelect + ` ${false ? '' : 'form-select-transparent'} `}
                                value={props.invDetails.LocationId}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                option={props.locations.map(location => { return { id: location.LocationId, value: location.Location } })}
                                disabled={true}
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
                                className={formInput + ` ${accessMethod('Invoice', 'Header', 'InvoiceNumber').Update ? '' : 'form-control-transparent'}`}
                                value={props.invDetails.InvoiceNumber}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                required={true}
                                formError={props.formError}
                                readOnly={!(accessMethod('Invoice', 'Header', 'InvoiceNumber').Update)}
                                disabled={!(accessMethod('Invoice', 'Header', 'InvoiceNumber').Update)}
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
                                className={formInput + ` ${accessMethod('Invoice', 'Header', 'InvoiceNumber').Update ? '' : 'form-control-transparent'}`}
                                value={invoiceDate}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                formError={props.formError}
                                required={true}
                                readOnly={!(accessMethod('Invoice', 'Header', 'InvoiceDate').Update)}
                                disabled={!(accessMethod('Invoice', 'Header', 'InvoiceDate').Update)}
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
                                className={formInput + ` ${false ? '' : 'form-control-transparent'} `}
                                value={props.invDetails.PurchaseNumber ? props.invDetails.PurchaseNumber : ''}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="form-group">
                            <InputTextDateField
                                label={'Due Date'}
                                id={'DueDate'}
                                name={'DueDate'}
                                className={formInput + ` ${accessMethod('Invoice', 'Header', 'DueDate').Update ? '' : 'form-control-transparent'}`}
                                value={dueDate}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                formError={props.formError}
                                readOnly={!(accessMethod('Invoice', 'Header', 'DueDate').Update)}
                                disabled={!(accessMethod('Invoice', 'Header', 'DueDate').Update)}
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
                                className={formInput + ` ${accessMethod('Invoice', 'Header', 'TotalAmount').Update ? '' : 'form-control-transparent'}`}
                                value={props.invDetails.TotalAmount}
                                onChange={changeHandler} onBlur={blurHandler}
                                icon={<DollarSvg clsName="svg-icon svg-icon-1" role="none" />}
                                formError={props.formError}
                                required={true}
                                readOnly={!(accessMethod('Invoice', 'Header', 'TotalAmount').Update)}
                                disabled={!(accessMethod('Invoice', 'Header', 'TotalAmount').Update)}
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
                                    className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                    value={'USD'}
                                    onChange={changeHandler}
                                    onBlur={blurHandler}
                                    readOnly={true}
                                    disabled={true}
                                />
                            </div></div>
                            <div className="col-6">
                                <div className="form-group">
                                    <InputTextField
                                        label='Tax'
                                        type="number"
                                        id="TaxTotal"
                                        name="TaxTotal"
                                        className={formInput + ` ${accessMethod('Invoice', 'Header', 'TaxAmount').Update ? '' : 'form-control-transparent'}`}
                                        value={props.invDetails.TaxTotal}
                                        onChange={changeHandler}
                                        onBlur={blurHandler}
                                        icon={<DollarSvg clsName="svg-icon  svg-icon-1" role="none" />}
                                        formError={props.formError}
                                        readOnly={!(accessMethod('Invoice', 'Header', 'TaxAmount').Update)}
                                        disabled={!(accessMethod('Invoice', 'Header', 'TaxAmount').Update)}
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
                            className={formInput + ` ${true ? 'form-control-transparent' : ''}`}
                            value={props.exSubtotal.toFixed(2)}
                            icon={<DollarSvg clsName="svg-icon  svg-icon-1" role="none" />}
                            readOnly={true}
                        // readOnly={accessMethod('Invoice', 'Header', 'InvoiceNumber').Read}
                        />
                    </div>
                    <div className="col-lg-3">
                        <InputTextField
                            label='PO Subtotal'
                            type="number"
                            id="POSubtotal"
                            name="POSubtotal"
                            className={formInput + ` ${true ? 'form-control-transparent' : ''}`}
                            value={props.POSubtotal.toFixed(2)}
                            icon={<DollarSvg clsName="svg-icon svg-icon-1" role="none" />}
                            readOnly={true}
                        // readOnly={accessMethod('Invoice', 'Header', 'InvoiceNumber').Read}
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
                                className={formInput + ` ${false ? '' : 'form-control-transparent'}`}
                                value={''}
                                onChange={changeHandler}
                                onBlur={blurHandler}
                                readOnly={true}
                                disabled={true}
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
                                    className={formInput + ` ${true ? '' : 'form-control-transparent'}`}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    onBlur={blurHandler}
                                    formError={commentError}
                                    readOnly={false}
                                    disabled={false}
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
                                    CurrentPermission?.permission?.Permission.find(permission => permission.Name === 'Approval')?.Access ?
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
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="d-flex flex-column">
                            <div className="d-flex">
                                <label className={formLabel + "me-auto"}>Attachments</label>
                                <div className="ms-auto">
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