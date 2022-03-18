import { Field } from "formik"
import { string } from "yup"
import { number } from "yup/lib/locale"
import { WorkFlow } from "../pages/WorkFlow"

export type expensesType = {
    ExpenseId: number,
    InvoiceId: number,
    Amount: number,
    Memo: string,
    AddedDateTime: Date,
    DepartmentId: number
    LocationId: number
    isCheck: boolean,
    isNew?: boolean
}[]

export type lineItemsType = {
    LineItemId: number,
    InvoiceId: number,
    Amount: number,
    PartNumber: string,
    ProductCode: string,
    Description: string,
    UnitPrice: number,
    Quantity: number,
    ShippingQuantity: number,
    Unit: number,
    Date: Date,
    TaxAmount: number,
    TaxPercentage: number,
    isCheck: boolean,
    isNew?: boolean,
    POAmount: number,
    PODepartment: number,
    PODescription: string,
    POItem: number,
    POQuantity: number,
    POUnitPrice: number
}[]


export type invDetailsType = {
    InvoiceId: number,
    CustomerName: string,
    CustomerId: string,
    DepartmentId: number,
    LocationId: number,
    VendorId: number,
    VendorCode: string | number,
    VendorName: string,
    VendorAddress: string,
    VendorAddress2: string,
    VendorAddress3: string,
    VendorAddressRecipient: string,
    InvoiceNumber: string,
    CustomerAddress: string,
    CustomerAddressRecipient: string,
    ShippingAddress: string,
    ShippingAddressRecipient: string,
    BillingAddress: string,
    BillingAddressRecipient: string,
    RemittanceAddress: string,
    RemittanceAddress2: string,
    RemittanceAddress3: string,
    RemittanceAddressRecipient: string,
    PurchaseNumber: string,
    DueDate: Date,
    InvoiceDate: Date,
    TotalAmount: number,
    TaxTotal: number,
    LineItems: [] | lineItemsType,
    Expenses: [] | expensesType,
    AmountDue: number,
    LastModifiedDateTime: string,
    TransactionDate: string,
    ReceivedDate: string
    StatusId: number,
    StatusText: string,
    SubmittedBy: string
}

export type vendors = {
    VendorId: number,
    VendorCode: string,
    VendorName: string,
    VendorAddressLine1: string,
    VendorAddressLine2: string,
    VendorAddressLine3: string,
    VendorCity: string,
    VendorState: string,
    VendorZipCode: string,
    VendorCountry: string,
    VendorPhoneNumber: string,
    VendorFax: string,
    RemitAddressLine1: string,
    RemitAddressLine2: string,
    RemitAddressLine3: string,
    RemitCity: string,
    RemitState: string,
    RemitZipCode: string,
    RemitCountry: string,
    RemitPhoneNumber: string,
    RemitFax: string
    SubsidiaryId: number
}[]
export type departments = { DepartmentId: number, DepartmentCode: string, DepartmentName: string }[]
export type locations = { LocationId: number, LocationTypeId: number, Location: string, LocationType: string }[]
export type subsidiary = {
    SubsidiaryId: number,
    Code: number,
    Name: string
}[]


export type userProfileType = {
    Id: number
    EnterpriseId: number
    CompanyId: number
    CreatedTimestamp: Date
    LastModifiedTimestamp: Date
    UserName: string
    FirstName: string
    MiddleName: string
    LastName: string
    DisplayName: string
    EmailAddress: string
    Password: string
    Active: boolean
    ResetRequired: boolean
    RoleId: number
}[]

export type WorkFlowField = {
    Field: string,
    Value: string
}[]


export type WorkFlowLevel = {
    Level: number,
    Approver: string,
    Amount: number,
    Percentage: number
}[]

export type WorkFlowApproval = {
    Field: WorkFlowField,
    Level: WorkFlowLevel
}[]

export type WorkFlowTableType = {
    WorkFlowId: number
    EnterpriseId: string
    CompanyId: string
    Name: string
    WorkFlowTypeId: number
    Approval: WorkFlowApproval
    CreatedBy: string
    CreatedTimestamp: Date
    LastModifiedTimestamp: Date
}


export type WorkFlowType = {
    WorkflowTypeId: number,
    Name: string,
    Description: string
}[]

export type FieldValue = {
    Id: number,
    Field: string,
    Type: string,
    Label: string[]
}

export type Fields = {
    Id: number,
    Type: string,
    Value: FieldValue[]
}[]