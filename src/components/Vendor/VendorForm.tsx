import { useState } from "react"
import { InputTextField } from "../components/InputField"
import { vendors } from "../Interface/Interface"

export const VendorForm = (props: {
    data: vendors[]
    setData: Function
    index: number | undefined
}) => {

    const [toggle, setToggle] = useState<'vendor' | 'remit'>('vendor')
    const [Vendor, setVendor] = useState<vendors>({
        VendorId: 0,
        VendorCode: '',
        VendorName: '',
        VendorAddressLine1: '',
        VendorAddressLine2: '',
        VendorAddressLine3: '',
        VendorCity: '',
        VendorState: '',
        VendorZipCode: '',
        VendorCountry: '',
        VendorPhoneNumber: '',
        VendorFax: '',
        RemitAddressLine1: '',
        RemitAddressLine2: '',
        RemitAddressLine3: '',
        RemitCity: '',
        RemitState: '',
        RemitZipCode: '',
        RemitCountry: '',
        RemitPhoneNumber: '',
        RemitFax: '',
        SubsidiaryId: 0
    } as vendors)
    const [formError, setFormError] = useState({
        VendorId: null,
        VendorCode: null,
        VendorName: null,
        VendorAddressLine1: null,
        VendorAddressLine2: null,
        VendorAddressLine3: null,
        VendorCity: null,
        VendorState: null,
        VendorZipCode: null,
        VendorCountry: null,
        VendorPhoneNumber: null,
        VendorFax: null,
        RemitAddressLine1: null,
        RemitAddressLine2: null,
        RemitAddressLine3: null,
        RemitCity: null,
        RemitState: null,
        RemitZipCode: null,
        RemitCountry: null,
        RemitPhoneNumber: null,
        RemitFax: null,
        SubsidiaryId: null
    })


    const changeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        const array = [...props.data]
        const error = { ...formError }
        if (value === '') {
            setFormError({ ...error, [name]: 'Required !' })
        } else {
            setFormError({ ...error, [name]: null })
        }
        props.index ? array[props.index][name] = value : setVendor({ ...Vendor, [name]: value })
        props.setData(array)
        console.log(error[name])
    }

    return (
        <form>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <InputTextField
                            label={"Vendor name"}
                            className={"form-control form-control-solid form-control-sm"}
                            name={'VendorName'}
                            id={'VendorName'}
                            type={'text'}
                            value={props.index ? props.data[props.index].VendorName : Vendor.VendorName}
                            onChange={changeHandler}
                            formError={formError}
                        />
                    </div>
                    <div className="col">
                        <InputTextField
                            label={"Vendor Code"}
                            className={"form-control form-control-solid form-control-sm"}
                            name={'VendorCode'}
                            id={'VendorCode'}
                            type={'text'}
                            value={props.index ? props.data[props.index].VendorCode : Vendor.VendorCode}
                            onChange={changeHandler}
                            formError={formError}
                        />
                    </div>
                    {/* <div className="col">
                        <InputTextField
                            label={"Vendor Account"}
                            className={"form-control form-control-solid form-control-sm"}
                            name={'AccountNumber'}
                            id={'AccountNumber'}
                            type={'text'}
                            value={props.index ? props.data[props.index].AccountNumber : Vendor.AccountNumber}
                            onChange={changeHandler}
                            formError={formError}
                        />
                    </div> */}
                </div>
                <div className="row">
                    <div className="col">
                        <div className="btn-group btn-group-sm my-4">
                            <div className={`btn  btn-active-primary ${toggle === 'vendor' ? 'active' : null}`} onClick={() => setToggle('vendor')}>Vendor</div>
                            <div className={`btn  btn-active-primary ${toggle === 'remit' ? 'active' : null}`} onClick={() => setToggle('remit')}>Remit</div>
                        </div>
                    </div>
                </div>
                {
                    toggle === 'vendor'
                        ? <>
                            <div className="row">
                                <div className="col">
                                    <InputTextField
                                        label={"Address Line1"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorAddressLine1'}
                                        id={'VendorAddressLine1'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorAddressLine1 : Vendor.VendorAddressLine1}
                                        onChange={changeHandler}
                                        formError={formError}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Address Line 2"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorAddressLine2'}
                                        id={'VendorAddressLine2'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorAddressLine2 : Vendor.VendorAddressLine2}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Address Line 3"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorAddressLine3'}
                                        id={'VendorAddressLine3'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorAddressLine3 : Vendor.VendorAddressLine3}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <InputTextField
                                        label={"City"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorCity'}
                                        id={'VendorCity'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorCity : Vendor.VendorCity}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"State"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorState'}
                                        id={'VendorState'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorState : Vendor.VendorState}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Zipcode"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorZipCode'}
                                        id={'VendorZipCode'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorZipCode : Vendor.VendorZipCode}
                                        onChange={changeHandler}
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <InputTextField
                                        label={"Country"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorCountry'}
                                        id={'VendorCountry'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorCountry : Vendor.VendorCountry}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Phone Number"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorPhoneNumber'}
                                        id={'VendorPhoneNumber'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorPhoneNumber : Vendor.VendorPhoneNumber}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Fax"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorFax'}
                                        id={'VendorFax'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorFax : Vendor.VendorFax}
                                        onChange={changeHandler}
                                    />
                                </div>

                            </div>
                        </>
                        : <>
                            <div className="row">
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Address Line1"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorAddressLine1'}
                                        id={'VendorAddressLine1'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorAddressLine1 : Vendor.VendorAddressLine1}
                                        onChange={changeHandler}
                                        formError={formError}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Address Line 2"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorAddressLine2'}
                                        id={'VendorAddressLine2'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorAddressLine2 : Vendor.VendorAddressLine2}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Address Line 3"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorAddressLine3'}
                                        id={'VendorAddressLine3'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorAddressLine3 : Vendor.VendorAddressLine3}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor City"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorCity'}
                                        id={'VendorCity'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorCity : Vendor.VendorCity}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor State"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorState'}
                                        id={'VendorState'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorState : Vendor.VendorState}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Zipcode"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorZipCode'}
                                        id={'VendorZipCode'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorZipCode : Vendor.VendorZipCode}
                                        onChange={changeHandler}
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Country"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorCountry'}
                                        id={'VendorCountry'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorCountry : Vendor.VendorCountry}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Phone Number"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorPhoneNumber'}
                                        id={'VendorPhoneNumber'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorPhoneNumber : Vendor.VendorPhoneNumber}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <InputTextField
                                        label={"Vendor Fax"}
                                        className={"form-control form-control-solid form-control-sm"}
                                        name={'VendorFax'}
                                        id={'VendorFax'}
                                        type={'text'}
                                        value={props.index ? props.data[props.index].VendorFax : Vendor.VendorFax}
                                        onChange={changeHandler}
                                    />
                                </div>

                            </div>
                        </>
                }
            </div>
        </form>
    )
}