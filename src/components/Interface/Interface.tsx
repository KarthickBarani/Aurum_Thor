

export type expensesType = {
    ExpenseId: number,
    InvoiceId: number,
    Account: number
    Amount: number,
    Memo: string,
    AddedDateTime: Date,
    Department: number
    LocationId: number
    isCheck: boolean,
    isNew?: boolean
}

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
}


export type invDetailsType = {
    InvoiceId: number,
    CustomerName: string,
    CustomerId: string,
    DepartmentId: number,
    LocationId: number,
    VendorId: number,
    VendorCode: string | number,
    VendorName: string | number,
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
    LineItems: lineItemsType[],
    Expenses: expensesType[],
    AmountDue: number,
    LastModifiedDateTime: string,
    TransactionDate: string,
    ReceivedDate: string
    StatusId: number,
    StatusText: string,
    SubmittedBy: string,
    IsPurchaseOrder: boolean
    FileURL: string
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
    AccountNumber: string
}

export type propsAddressType = {
    AddressTypeId: number,
    AddressType: string
}

export type propsAddressList = {
    AddressId: number,
    AddressLine1: string,
    AddressLine2: string,
    AddressLine3: string,
    Addressee: string,
    City: string,
    State: string,
    ZipCode: string,
    Country: string,
    PhoneNumber: string,
    Fax: string,
    AddressType: propsAddressType
}

export type propsVendorPost = {
    Vendor: {
        VendorId: number,
        VendorCode: string,
        VendorName: string,
        AccountNumber: string
    }
    AddressList: propsAddressList[]
}

export type departments = { DepartmentId: number, DepartmentCode: string, DepartmentName: string }[]
export type locations = { LocationId: number, LocationTypeId: number, Location: string, LocationType: string }[]
export type subsidiary = {
    SubsidiaryId: number,
    Code: number,
    Name: string
}[]

export type account = {
    AccountId: number,
    AccountName: string,
    AccountNumber: number,
    AccountType: string,
    DepartmentId: number,
    LocationId: number,
    Inventory: boolean,
    IsInActive: boolean,
    LegalName: string,
    LastSyncedDateTime: Date
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
    Roles: any[]
}

export type WorkFlowFields = {
    Id: number,
    FieldName: string,
    Type: string

}[]

export type Fields = {
    Id: number,
    Type: string,
    Value: {
        Id: number,
        Field: string,
        Type: string,
        Label: string[]
    }[]
}[]


export type WorkFlowLevel = {
    Level: number,
    Approver: number | string,
    Amount: number,
    Percentage: number
}[]

export type WorkFlowApproval = {
    Fields: WorkFlowFields,
    Level: WorkFlowLevel
}

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
    Label?: string[]
}


export type AuthUser = {
    Message: string
    Status: boolean
    User: userProfileType
    AccessToken: string
}

export type ApprovalHistoryProps = {
    ApproverName: string
    Status: number
    Level: number
    StatusText: string
    Comments: string
    ActionOn: Date
}

export type NextApprovers = {
    ApproverId: number | string,
    ApproverName: string,
    Status: number,
    Level: number,
    StatusText: string,
    Comments: string,
    ActionOn: Date
}

export type dummy = {
    Approval: WorkFlowApproval
}

export type LevelElementError = {
    approverError: boolean[]
    amountError: boolean[]
    percentageError: boolean[]
    message: string[]
}