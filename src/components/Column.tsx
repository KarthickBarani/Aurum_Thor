

export const Column = [
    {
        Header: '#',
        accessor: 'InvoiceId',

    },
    {
        Header: 'Action',
        accessor: 'Action',
        Cell: () => {
            return (
                <>
                    <span role='button' title="View" className="svg-icon svg-icon-primary svg-icon-1"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3"
                            d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z"
                            fill="black" />
                        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
                    </svg></span>&nbsp;&nbsp;

                    <span role="button" data-bs-toggle="popover" data-bs-dismiss="true" data-bs-placement="top" title="Error Code: No Error" className="svg-icon svg-icon-danger svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                        <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="black" />
                        <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="black" />
                    </svg></span>
                </>
            )
        }
    },
    {
        Header: 'Recevied Date',
        accessor: row => new Date(row.ReceivedDate).toLocaleString(),

    },
    {
        Header: 'Vendor Id',
        accessor: 'VendorId',
    },
    {
        Header: 'Vendor',
        accessor: 'VendorName',
    },
    {
        Header: 'Invoice Date',
        accessor: (row) => new Date(row.InvoiceDate).toLocaleDateString(),
    },
    {
        Header: 'Inv #',
        accessor: 'InvoiceNumber',
    }, {
        Header: 'Due Amount',
        accessor: (row) => `$ ${row.AmountDue.toFixed(2)}`,
    }, {
        Header: 'PO',
        accessor: 'PurchaseNumber',
    }, {
        Header: 'PO Status',
        accessor: 'poStatus',
    }, {
        Header: 'Terms',
        accessor: 'terms',

    }, {
        Header: 'Assignment',
        accessor: 'assignment',
    }, {
        Header: 'Updated',
        accessor: 'updated',
    }, {
        Header: 'Currency',
        accessor: 'currency',
    }, {
        Header: 'Total',
        accessor: (row: { TotalAmount: number }) => `$ ${row.TotalAmount.toFixed(2)}`,

    }
]
export const InvoiceColumn = [
    {
        Header: '#',
        accessor: 'InvoiceId',

    },
    {
        Header: 'Action',
        accessor: 'Action',
        Cell: () => {
            return (
                <>
                    <span role='button' title="View" className="svg-icon svg-icon-primary svg-icon-1"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3"
                            d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z"
                            fill="black" />
                        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
                    </svg></span>&nbsp;&nbsp;
                    <span role="button" data-bs-toggle="popover" data-bs-dismiss="true" data-bs-placement="top" title="Error Code: No Error" className="svg-icon svg-icon-danger svg-icon-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
                        <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="black" />
                        <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="black" />
                    </svg></span>
                </>
            )
        }
    },
    {
        Header: 'Recevied Date',
        accessor: row => new Date(row.ReceivedDate).toLocaleString(),

    },
    {
        Header: 'Vendor Id',
        accessor: 'VendorId',
    },
    {
        Header: 'Vendor',
        accessor: 'VendorName',
    },
    {
        Header: 'Invoice Date',
        accessor: (row) => new Date(row.InvoiceDate).toLocaleDateString(),
    },
    {
        Header: 'Inv #',
        accessor: 'InvoiceNumber',
    }, {
        Header: 'Due Amount',
        accessor: (row) => `$ ${row.AmountDue.toFixed(2)}`,
    }, {
        Header: 'PO',
        accessor: 'PurchaseNumber',
    }, {
        Header: 'PO Status',
        accessor: 'poStatus',
    }, {
        Header: 'Terms',
        accessor: 'terms',

    }, {
        Header: 'Assignment',
        accessor: 'assignment',
    }, {
        Header: 'Updated',
        accessor: 'updated',
    }, {
        Header: 'Currency',
        accessor: 'currency',
    }, {
        Header: 'Total',
        accessor: (row: { TotalAmount: number }) => `$ ${row.TotalAmount.toFixed(2)}`,

    }, {
        Header: 'Status',
        accessor: 'status'
    }

]

