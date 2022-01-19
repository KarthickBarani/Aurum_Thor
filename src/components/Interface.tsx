export type expensesType = {
    ExpenseId: number,
    InvoiceId: number,
    Amount: number,
    Memo: null | string,
    AddedDateTime: null | string,
    isCheck: false
}[]

export type lineItemsType = {
    LineItemId: number,
    InvoiceId: number,
    Amount: number,
    PartNumber: null | string,
    ProductCode: null | string,
    Description: string,
    UnitPrice: number,
    Quantity: number,
    ShippingQuantity: number,
    Unit: number,
    Date: null | string,
    TaxAmount: number,
    TaxPercentage: number,
    isCheck: false
}[]


export type invDetailsType = {
    InvoiceId: number,
    CustomerName: null | string,
    CustomerId: null | string,
    VendorId: null | string,
    VendorCode: string | number
    VendorName: null | string,
    VendorAddress: null | string,
    VendorAddressRecipient: null | string,
    InvoiceNumber: null | string,
    CustomerAddress: null | string,
    CustomerAddressRecipient: null | string,
    ShippingAddress: null | string,
    ShippingAddressRecipient: null | string,
    BillingAddress: null | string,
    BillingAddressRecipient: null | string,
    RemittanceAddress: null | string,
    RemittanceAddressRecipient: null | string,
    PurchaseNumber: null | string,
    DueDate: null | string,
    InvoiceDate: null | string,
    TotalAmount: number,
    TaxTotal: number,
    LineItems: [] | lineItemsType,
    Expenses: [] | expensesType,
    AmountDue: number,
    LastModifiedDateTime: null | string,
    TransactionDate: null | string,
    ReceivedDate: null | string
}

export type vendors = {
    map(arg0: (vendor: any) => JSX.Element): import("react").ReactNode
    VendorId: number,
    VendorCode: string | number,
    VendorName: string
}[]
export type departments = { DepartmentId: number, DepartmentCode: string | number, DepartmentName: string }[]
export type locations = { LocationId: number, LocationTypeId: number, Location: string, LocationType: string }[]
