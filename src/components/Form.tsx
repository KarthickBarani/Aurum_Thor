
import { useFormik } from "formik"
import { useEffect } from "react"
import { invDetailsType, vendors, departments, locations, subsidiary } from '../components/Interface'
import * as Yup from 'yup'
import moment from "moment"



export const Form = (props: {
    invDetails: invDetailsType,
    exSubtotal: number,
    POSubtotal: number,
    subsidiaries: subsidiary
    setInvDetails: Function,
    setModifyInvDetails: Function,
    vendors: vendors,
    departments: departments,
    locations: locations
    origin: invDetailsType
}) => {


    const initialValues = {
        vendorName: props.invDetails?.VendorId,
        vendorId: props.invDetails?.VendorCode,
        remitTo: props.invDetails?.CustomerName,
        vendorAddress1: props.invDetails?.VendorAddress === "undefined,undefined,undefined,undefined,undefined" ? props.origin.VendorAddress?.split(',')[0] : props.invDetails?.VendorAddress?.split(',')[0],
        vendorAddress2: props.invDetails?.VendorAddress === "undefined,undefined,undefined,undefined,undefined" ? props.origin.VendorAddress?.split(',')[1] : props.invDetails?.VendorAddress?.split(',')[1] + '-' + props.invDetails?.VendorAddress?.split(',')[2],
        vendorAddress3: props.invDetails?.VendorAddress === "undefined,undefined,undefined,undefined,undefined" ? props.origin.VendorAddress?.split(',')[2] : props.invDetails?.VendorAddress?.split(',')[3] + ',' + props.invDetails?.VendorAddress?.split(',')[4],
        department: props.invDetails?.DepartmentId,
        location: props.invDetails?.LocationId,
        subsidiary: props.subsidiaries[props.subsidiaries.findIndex(arr => arr.SubsidiaryId === Number(props.invDetails?.VendorName))]?.SubsidiaryId,
        address: props.invDetails?.RemittanceAddress === "undefined,undefined,undefined,undefined,undefined" ? props.vendors[props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails.VendorName))]?.RemitAddressLine1 : props.invDetails?.RemittanceAddress?.split(',')[0],
        address2: props.invDetails?.RemittanceAddress === "undefined,undefined,undefined,undefined,undefined" ? props.vendors[props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails.VendorName))]?.RemitCity + ' - ' + props.vendors[props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails.VendorName))]?.RemitZipCode : props.invDetails?.RemittanceAddress?.split(',')[1] + '-' + props.invDetails?.RemittanceAddress?.split(',')[2],
        address3: props.invDetails?.RemittanceAddress === "undefined,undefined,undefined,undefined,undefined" ? props.vendors[props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails.VendorName))]?.RemitState + ',' + props.vendors[props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails.VendorName))]?.RemitCountry : props.invDetails?.RemittanceAddress?.split(',')[3] + ',' + props.invDetails?.VendorAddress?.split(',')[4],
        poNo: props.invDetails?.PurchaseNumber,
        invoiceNumber: props.invDetails?.InvoiceNumber,
        invoiceDate: moment(props.invDetails?.InvoiceDate).format('MM/DD/yyyy'),
        postingPeriod: '',
        dueDate: moment(props.invDetails?.DueDate).format('MM/DD/yyyy'),
        invoiceAmount: props.invDetails?.TotalAmount,
        currency: 'USD',
        tax: props.invDetails?.TaxTotal.toFixed(2),
        exSubtotal: props.exSubtotal?.toFixed(2),
        poSubtotal: props.POSubtotal?.toFixed(2),
        memo: '',
        approver: '',
        comment: ''
    }

    const onSubmit = values => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        vendorName: Yup.number().required('Required !'),
        vendorId: Yup.number().required('Required !').positive().typeError('Must be a number'),
        remitTo: Yup.number().required('Required !'),
        vendorAddress1: Yup.string().required('Required !'),
        vendorAddress2: Yup.string().required('Required !'),
        vendorAddress3: Yup.string().required('Required !'),
        department: Yup.number().required('Required !'),
        location: Yup.number().required('Required !'),
        subsidiary: Yup.string().required('Required !'),
        address: Yup.string().required('Required !'),
        address2: Yup.string().required('Required !'),
        address3: Yup.string().required('Required !'),
        poNo: Yup.string().notRequired(),
        invoiceNumber: Yup.string().required('Required !'),
        invoiceDate: Yup.date().required('Required !').typeError('invaild Date Format: "mm/dd/yyyy"'),
        postingPeriod: Yup.string().notRequired(),
        dueDate: Yup.date().notRequired(),
        invoiceAmount: Yup.string().required('Required !'),
        currency: Yup.string().required('Required !'),
        tax: Yup.string().required('Required !'),
        exSubtotal: Yup.string().required('Required !'),
        poSubtotal: Yup.string().required('Required !'),
        memo: Yup.string().required('Required !'),
        approver: Yup.string().required('Required !'),
        comment: Yup.string().required('Required !'),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema,
    })


    useEffect(() => {
        let ind = props.vendors?.findIndex(arr => arr.VendorId === Number(props.invDetails?.VendorName))
        console.log(`${ind}`, props.vendors[ind]?.RemitCity)
        props.setInvDetails({
            ...props.invDetails,
            // DueDate: formik.values.dueDate ? new Date(1 / 1 / 1) : new Date(1 / 1 / 1),
            // InvoiceDate: new Date(formik.values.invoiceDate),
            // InvoiceNumber: formik.values.invoiceNumber,
            TaxTotal: Number(formik.values.tax),
            TotalAmount: Number(formik.values.invoiceAmount),
            VendorAddress: props.vendors[ind]?.VendorAddressLine1 + ',' + props.vendors[ind]?.VendorCity + ',' + props.vendors[ind]?.VendorZipCode + ',' + props.vendors[ind]?.VendorState + ',' + props.vendors[ind]?.VendorCountry,
            RemittanceAddress: props.vendors[ind]?.RemitAddressLine1 + ',' + props.vendors[ind]?.RemitCity + ',' + props.vendors[ind]?.RemitZipCode + ',' + props.vendors[ind]?.RemitState + ',' + props.vendors[ind]?.RemitCountry,
            VendorId: Number(formik.values.vendorName) ? formik.values.vendorName : props.invDetails?.VendorId,
            VendorName: formik.values.vendorName,
            VendorCode: props.vendors[ind]?.VendorCode,
            DepartmentId: formik.values.department,
            LocationId: formik.values.location

        })
        props.setModifyInvDetails({
            ...props.invDetails,
            DueDate: new Date(formik.values.dueDate || "0001-01-01T00:00:00"),
            InvoiceDate: new Date(formik.values.invoiceDate),
            InvoiceNumber: formik.values.invoiceNumber,
            TaxTotal: Number(formik.values.tax),
            TotalAmount: Number(formik.values.invoiceAmount),
            VendorAddress: formik.values.vendorAddress1 + ',' + formik.values.vendorAddress2 + ',' + formik.values.vendorAddress3,
            RemittanceAddress: formik.values.address + ',' + formik.values.address2 + ',' + formik.values.address3,
            VendorId: Number(formik.values.vendorName) ? formik.values.vendorName : props.invDetails?.VendorId,
            VendorName: formik.values.vendorName,
            VendorCode: props.vendors[ind]?.VendorCode,
            DepartmentId: formik.values.department,
            LocationId: formik.values.location
        })

    }, [formik.values])

    const formInput = 'form-control form-control-solid mb-1'
    const formSelect = 'form-select form-select-solid'
    const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2 '



    return (
        < form onSubmit={formik.handleSubmit} >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="vendorName" className={formLabel + 'required'}>Vendor
                                Name</label>
                            <div className="input-group input-group-solid">
                                <select id="vendorName" name="vendorName" value={formik.values.vendorName} className={formSelect} onChange={formik.handleChange} onBlur={formik.handleBlur} >

                                    {props.vendors?.map(vendor => (
                                        <option key={vendor.VendorId} value={vendor.VendorId} >{vendor.VendorName}</option>
                                    ))}
                                </select>
                                <button className='btn btn-secondary btn-sm' ><span className="svg-icon svg-icon-muted svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="black" />
                                    <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="black" />
                                </svg></span></button>
                            </div>
                            {formik.errors.vendorName && formik.touched.vendorName && formik.dirty ? <small className="text-danger text-sm">{formik.errors.vendorName}</small> : null}
                        </div>
                    </div>
                    <div className="col-2">
                        <label htmlFor="vendorId" className={formLabel}>
                            Vendor Code</label>
                        <input readOnly className={formik.errors.vendorId && formik.touched.vendorId && formik.dirty ? formInput + ' is-invalid' : formInput} id="vendorId" name="vendorId" type="text" onChange={formik.handleChange} value={formik.values.vendorId} onBlur={formik.handleBlur} />
                        {formik.errors.vendorId && formik.touched.vendorId && formik.dirty ? <small className="text-danger ">{formik.errors.vendorId}</small> : null}
                    </div>
                    <div className="col-6">
                        <div className="form-group text-start">
                            <label htmlFor="remitTo" className={formLabel}>Remit
                                To</label>
                            <select id="remitTo" name="remitTo" className={formik.errors.remitTo && formik.touched.remitTo && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                                <option>{formik.values.remitTo}</option>
                            </select>
                        </div>
                        {formik.errors.remitTo && formik.touched.remitTo && formik.dirty ? <small className="text-danger ">{formik.errors.remitTo}</small> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="vendorAddress1" className={formLabel}>Vendor
                                Address</label>
                            <input id="venderAddress1" name="venderAddress1" readOnly className={formik.errors.vendorAddress1 && formik.touched.vendorAddress1 && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values?.vendorAddress1} onBlur={formik.handleBlur} />
                            <input id="venderAddress2" name="venderAddress2" readOnly className={formik.errors.vendorAddress1 && formik.touched.vendorAddress1 && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values?.vendorAddress2} onBlur={formik.handleBlur} />
                            <input id="venderAddress3" name="venderAddress3" readOnly className={formik.errors.vendorAddress1 && formik.touched.vendorAddress1 && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values?.vendorAddress3} onBlur={formik.handleBlur} />
                        </div>
                        {formik.errors.vendorAddress1 && formik.touched.vendorAddress1 && formik.dirty ? <small className="text-danger ">{formik.errors.vendorAddress1}</small> : null}
                        <div className="form-group">
                            <label htmlFor="subsidiary"
                                className={formLabel}>Subsidiary</label>
                            <select id="subsidiary" name="subsidiary" value={formik.values.subsidiary} className={formSelect} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                                {props.subsidiaries?.map(sub => (
                                    <option key={sub.SubsidiaryId} value={sub.SubsidiaryId} >{sub.Name}</option>
                                ))}
                            </select>
                        </div>
                        {formik.errors.subsidiary && formik.touched.subsidiary && formik.dirty ? <small className="text-danger ">{formik.errors.subsidiary}</small> : null}
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="address" className={formLabel}>
                                Address</label>
                            <input id="address" name="address" readOnly className={formik.errors.address && formik.touched.address && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} />
                            <input id="address2" name="address2" readOnly className={formik.errors.address ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values.address2} onBlur={formik.handleBlur} />
                            <input id="address3" name="address3" readOnly className={formik.errors.address ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values.address3} onBlur={formik.handleBlur} />
                        </div>
                        {formik.errors.address && formik.touched.address && formik.dirty ? <small className="text-danger ">{formik.errors.address}</small> : null}
                        <div className="form-group ">
                            <label htmlFor="department" className={formLabel}>
                                Department</label>
                            <select id="department" name="department" value={props.invDetails?.DepartmentId} className={formSelect} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                                <option value={0}></option>
                                {props.departments.map(dept => {
                                    return (
                                        <option key={dept.DepartmentId} value={dept.DepartmentId} >{dept.DepartmentName}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        {formik.errors.department && formik.touched.department && formik.dirty ? <small className="text-danger ">{formik.errors.department}</small> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="poNo" className={formLabel} >
                                PO #</label>
                            <div className='input-group input-group-solid'>
                                <select id="poNo" name="poNo" className={formSelect} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                                    <option value={0} ></option>
                                </select>
                                <button className='btn btn-secondary btn-sm'><span className="svg-icon svg-icon-light svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.5 20.7259C14.6 21.2259 14.2 21.826 13.7 21.926C13.2 22.026 12.6 22.0259 12.1 22.0259C9.5 22.0259 6.9 21.0259 5 19.1259C1.4 15.5259 1.09998 9.72592 4.29998 5.82592L5.70001 7.22595C3.30001 10.3259 3.59999 14.8259 6.39999 17.7259C8.19999 19.5259 10.8 20.426 13.4 19.926C13.9 19.826 14.4 20.2259 14.5 20.7259ZM18.4 16.8259L19.8 18.2259C22.9 14.3259 22.7 8.52593 19 4.92593C16.7 2.62593 13.5 1.62594 10.3 2.12594C9.79998 2.22594 9.4 2.72595 9.5 3.22595C9.6 3.72595 10.1 4.12594 10.6 4.02594C13.1 3.62594 15.7 4.42595 17.6 6.22595C20.5 9.22595 20.7 13.7259 18.4 16.8259Z" fill="black" />
                                    <path opacity="0.3" d="M2 3.62592H7C7.6 3.62592 8 4.02592 8 4.62592V9.62589L2 3.62592ZM16 14.4259V19.4259C16 20.0259 16.4 20.4259 17 20.4259H22L16 14.4259Z" fill="black" />
                                </svg></span></button>
                            </div>
                        </div>
                        {formik.errors.poNo && formik.touched.poNo && formik.dirty ? <small className="text-danger ">{formik.errors.poNo}</small> : null}
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="location" className={formLabel}>
                                Location</label>
                            <select id="location" name="location" value={props.invDetails?.LocationId} className={formSelect} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                                <option value={0}></option>
                                {props.locations.map(location => {
                                    return (
                                        <option key={location.LocationId} value={location.LocationId} >{location.Location}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        {formik.errors.location && formik.touched.location && formik.dirty ? <small className="text-danger ">{formik.errors.location}</small> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="d-flex flex-column">
                            <label htmlFor="invoiceNumber"
                                className={formLabel + 'required'}>InvoiceNumber</label>
                            <input id="invoiceNumber" name="invoiceNumber" className={formik.errors.invoiceNumber && formik.touched.invoiceNumber && formik.dirty ? formInput + ' is-invalid' : formInput} maxLength={20} onChange={formik.handleChange} value={formik.values.invoiceNumber} onBlur={formik.handleBlur} />
                            <div className="form-check py-auto">
                                <label htmlFor="creditMemo"
                                    className="form-check-label mt-5 fw-bolder fs-6 gray-700  ">Credit
                                    Memo?</label>
                                <input type="checkbox" id="creditMemo" name="creditMemo" className="form-check-input form-check-solid mt-5" />
                            </div>
                        </div>
                        {formik.errors.invoiceNumber && formik.touched.invoiceNumber && formik.dirty ? <small className="text-danger ">{formik.errors.invoiceNumber}</small> : null}
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="invoiceDate" className={formLabel + 'required'}>Invoice
                                Date</label>
                            <input id="invoiceDate" name="invoiceDate" data-inputmask="'mask': '99/99/9999','placeholder': 'mm/dd/yyyy' "
                                className={formik.errors.invoiceDate && formik.touched.invoiceDate && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values.invoiceDate} onBlur={formik.handleBlur} />
                        </div>
                        {formik.errors.invoiceDate && formik.touched.invoiceDate && formik.dirty ? <small className="text-danger ">{formik.errors.invoiceDate}</small> : null}
                    </div>
                    <div className=" col-3">
                        <div className="form-group">
                            <label htmlFor="postingPeriod" className={formLabel}>Posting
                                Period</label>
                            <input id="postingPeriod" name="postingPeriod" className={formik.errors.postingPeriod && formik.touched.postingPeriod && formik.dirty ? formInput + ' is-invalid' : formInput} maxLength={20} onChange={formik.handleChange} value={formik.values.postingPeriod} onBlur={formik.handleBlur} />
                        </div>
                        {formik.errors.postingPeriod && formik.touched.postingPeriod && formik.dirty ? <small className="text-danger ">{formik.errors.postingPeriod}</small> : null}
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="dueDate" className={formLabel}>Due
                                Date</label>
                            <input id="dueDate" name="dueDate" className={formik.errors.dueDate && formik.touched.dueDate && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values.dueDate} onBlur={formik.handleBlur} />
                        </div>
                        {formik.errors.dueDate && formik.touched.dueDate && formik.dirty ? <small className="text-danger ">{formik.errors.dueDate}</small> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="form-group">
                            <label htmlFor="invoiceAmount" className={formLabel + 'required'}>Invoice
                                Amount</label>
                            <div className="input-group input-group-solid">
                                <span className="input-group-text">$</span>
                                <input id="invoiceAmount" name="invoiceAmount" type='number' className={formik.errors.invoiceAmount && formik.touched.invoiceAmount && formik.dirty ? formInput + ' is-invalid' : formInput} maxLength={15} onChange={formik.handleChange} value={formik.values.invoiceAmount} onBlur={formik.handleBlur} />
                            </div>
                        </div>
                        {formik.errors.invoiceAmount && formik.touched.invoiceAmount && formik.dirty ? <small className="text-danger ">{formik.errors.invoiceAmount}</small> : null}
                    </div>
                    <div className="col-3 d-flex">
                        <div className="form-group me-1">
                            <label htmlFor="currency" className={formLabel}>Currency</label>
                            <input id="currency" name="currency" type="text" className={formik.errors.currency && formik.touched.currency && formik.dirty ? formInput + ' is-invalid' : formInput} maxLength={5} onChange={formik.handleChange} value={formik.values.currency} onBlur={formik.handleBlur} />
                        </div>
                        {formik.errors.currency && formik.touched.currency && formik.dirty ? <small className="text-danger ">{formik.errors.currency}</small> : null}
                        <div className="form-group ms-1">
                            <label htmlFor="tax" className={formLabel}>
                                Tax</label>
                            <div className="input-group input-group-solid">
                                <span className="input-group-text">$</span>
                                <input id="tax" name="tax" type='number' className={formik.errors.tax && formik.touched.tax && formik.dirty ? formInput + ' is-invalid' : formInput} onChange={formik.handleChange} value={formik.values.tax} onBlur={formik.handleBlur} />
                            </div>
                        </div>
                        {formik.errors.tax && formik.touched.tax && formik.dirty ? <small className="text-danger ">{formik.errors.tax}</small> : null}
                    </div>
                    <div className="col-3">
                        <label htmlFor="exSubtotal" className={formLabel}>Expenses Subtotal</label>
                        <div className="input-group input-group-solid">
                            <span className="input-group-text">$</span>
                            <input id="exSubtotal" name="exSubtotal" readOnly type="number" onChange={formik.handleChange} value={formik.values.exSubtotal} onBlur={formik.handleBlur} className={formik.errors.exSubtotal && formik.touched.exSubtotal && formik.dirty ? formInput + ' is-invalid' : formInput} maxLength={12} />
                        </div>
                        {formik.errors.exSubtotal && formik.touched.exSubtotal && formik.dirty ? <small className="text-danger ">{formik.errors.exSubtotal}</small> : null}
                    </div>
                    <div className="col-3">
                        <label htmlFor="poSubtotal" className={formLabel}>PO Subtotal</label>
                        <div className="input-group input-group-solid">
                            <span className="input-group-text">$</span>
                            <input id="poSubtotal" name="poSubtotal" readOnly type="number" onChange={formik.handleChange} value={formik.values.poSubtotal} onBlur={formik.handleBlur} className={formik.errors.poSubtotal && formik.touched.poSubtotal && formik.dirty ? formInput + ' is-invalid' : formInput} maxLength={10} />
                        </div>
                        {formik.errors.poSubtotal && formik.touched.poSubtotal && formik.dirty ? <small className="text-danger ">{formik.errors.poSubtotal}</small> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="memo" className={formLabel}>Memo</label>
                            <input id="memo" name="memo" type="text" className={formik.errors.memo && formik.touched.memo && formik.dirty ? formInput + ' is-invalid' : formInput} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.memo} />
                        </div>
                        {formik.errors.memo && formik.touched.memo && formik.dirty ? <small className="text-danger ">{formik.errors.memo}</small> : null}
                        <div className="form-group">
                            <label htmlFor="approver" className={formLabel}>Approver</label>
                            <input id="approver" name="approver" type="text" className={formik.errors.approver && formik.touched.approver && formik.dirty ? formInput + ' is-invalid' : formInput} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.approver} />
                        </div>
                        {formik.errors.approver && formik.touched.approver && formik.dirty ? <small className="text-danger ">{formik.errors.approver}</small> : null}
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column">
                            <div className="form-group w-100">
                                <label htmlFor="comments" className={formLabel + 'required'}>
                                    Comments</label>
                                <textarea id="comment" name="comment" rows={5} className={formik.errors.comment && formik.touched.comment && formik.dirty ? formInput + ' is-invalid' : formInput} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.comment} />
                            </div>
                            {formik.errors.comment && formik.touched.comment && formik.dirty ? <small className="text-danger ">{formik.errors.comment}</small> : null}
                            <div className="d-flex justify-content-end">
                                {

                                    props.invDetails?.StatusId === 0
                                        ?
                                        <button type="submit" className="btn btn-light-primary btn-sm m-2">Submit Approval
                                        </button>
                                        :
                                        props.invDetails?.StatusId === 1
                                            ?
                                            <>
                                                <button className="btn btn-light-success btn-sm m-2">Approved
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
                                                <button className="btn btn-light-warning btn-sm my-2">Not
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
        </form >
    )
}

