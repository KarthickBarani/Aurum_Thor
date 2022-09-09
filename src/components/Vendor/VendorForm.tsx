import { type } from "os"
import { useEffect, useMemo, useState } from "react"
import { AxiosGet } from "../../helpers/Axios"
import { InputTextField } from "../components/InputField"
import { propsAddressType, propsVendorPost, vendors } from "../Interface/Interface"

export const VendorForm = (props: {
    vendor: propsVendorPost
    setVendor: Function
    formError: any
    setFormError: Function
}) => {

    const [addressType, setAddressType] = useState<propsAddressType[]>([] as propsAddressType[])
    const [toggle, setToggle] = useState<number>(1)

    useState(() => {
        AxiosGet('/Vendor/AddressType')
            .then(res => {
                setAddressType(res)
            })
            .catch(err => console.log(err))

    })
    useEffect(() => {
        return () => props.setFormError({
            Vendor: {
                VendorCode: null,
                VendorName: null,
                AccountNumber: null,
            },
            AddressList: [
                {
                    AddressLine1: null,
                    AddressLine2: null,
                    AddressLine3: null,
                    Addressee: null,
                    City: null,
                    State: null,
                    ZipCode: null,
                    Country: null,
                    PhoneNumber: null,
                    Fax: null
                },
                {
                    AddressLine1: null,
                    AddressLine2: null,
                    AddressLine3: null,
                    Addressee: null,
                    City: null,
                    State: null,
                    ZipCode: null,
                    Country: null,
                    PhoneNumber: null,
                    Fax: null
                }
            ]

        })
    }, [])




    const changeHandler = (e) => {
        const name = e.target.name
        const id = e.target.id
        const value = e.target.value
        const addressList = [...props.vendor.AddressList]
        const errorAddressList = [...props.formError.AddressList]
        if (value === '') {
            errorAddressList[toggle - 1] = { ...props.formError.AddressList[toggle - 1], [id]: 'Requied!' }
            props.setFormError({ ...props.formError, [name]: name === 'Vendor' ? { ...props.formError[name], [id]: 'Requied!' } : [...errorAddressList] })
        } else {
            errorAddressList[toggle - 1] = { ...props.formError.AddressList[toggle - 1], [id]: null }
            props.setFormError({ ...props.formError, [name]: name === 'Vendor' ? { ...props.formError[name], [id]: null } : [...errorAddressList] })

        }

        addressList[toggle - 1] = { ...props.vendor.AddressList[toggle - 1], [id]: value }
        props.setVendor({ ...props.vendor, [name]: name === 'Vendor' ? { ...props.vendor[name], [id]: value } : [...addressList] })

    }

    return (
        <form>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <InputTextField
                            label={"Vendor name"}
                            className={"form-control form-control-solid form-control-sm"}
                            name={'Vendor'}
                            id={'VendorName'}
                            type={'text'}
                            value={props.vendor?.Vendor?.VendorName}
                            onChange={changeHandler}
                            formError={props.formError}
                            required={true}
                        />
                    </div>
                    <div className="col">
                        <InputTextField
                            label={"Vendor Code"}
                            className={"form-control form-control-solid form-control-sm"}
                            name={'Vendor'}
                            id={'VendorCode'}
                            type={'text'}
                            value={props.vendor?.Vendor?.VendorCode}
                            onChange={changeHandler}
                            formError={props.formError}
                            required={true}
                        />
                    </div>
                    <div className="col">
                        <InputTextField
                            label={"Vendor Account"}
                            className={"form-control form-control-solid form-control-sm"}
                            name={'Vendor'}
                            id={'AccountNumber'}
                            type={'text'}
                            value={props.vendor?.Vendor?.AccountNumber}
                            onChange={changeHandler}
                            formError={props.formError}
                            required={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="btn-group btn-group-sm my-4">
                            {
                                addressType?.map(
                                    (type) => {
                                        return (
                                            <div key={type.AddressTypeId} className={`btn  btn-active-primary ${toggle === type.AddressTypeId ? 'active' : null}`} onClick={() => setToggle(type.AddressTypeId)}>{type.AddressType}</div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    addressType.length > 0
                        ?
                        toggle === 1
                            ? <>
                                <div className="row">
                                    <div className="col">
                                        <InputTextField
                                            label={"Address Line 1"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'AddressLine1'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.AddressLine1}
                                            onChange={changeHandler}
                                            formError={props.formError}
                                            required={true}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Address Line 2"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'AddressLine2'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.AddressLine2}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Address Line 3"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'AddressLine3'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.AddressLine3}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <InputTextField
                                            label={"City"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'City'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.City}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"State"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'State'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.State}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Zipcode"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'ZipCode'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.ZipCode}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                        <InputTextField
                                            label={"Country"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'Country'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.Country}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Phone Number"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'PhoneNumber'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.PhoneNumber}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Fax"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'Fax'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.Fax}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="row">
                                    <div className="col">
                                        <InputTextField
                                            label={"Address Line 1"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'AddressLine1'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.AddressLine1}
                                            onChange={changeHandler}
                                            formError={props.formError}
                                            required={true}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Address Line 2"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'AddressLine2'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.AddressLine2}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Address Line 3"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'AddressLine3'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.AddressLine3}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <InputTextField
                                            label={"City"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'City'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.City}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"State"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'State'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.State}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Zipcode"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'ZipCode'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.ZipCode}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                        <InputTextField
                                            label={"Country"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'Country'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.Country}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Phone Number"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'PhoneNumber'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.PhoneNumber}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>
                                    <div className="col">
                                        <InputTextField
                                            label={"Fax"}
                                            className={"form-control form-control-solid form-control-sm"}
                                            name={'AddressList'}
                                            id={'Fax'}
                                            type={'text'}
                                            value={props.vendor.AddressList.length === 0 ? "" : props.vendor.AddressList?.find(arr => arr.AddressType?.AddressTypeId === toggle)?.Fax}
                                            onChange={changeHandler}
                                            temp={toggle}
                                        />
                                    </div>

                                </div>
                            </>
                        : null
                }
            </div>
        </form>
    )
}