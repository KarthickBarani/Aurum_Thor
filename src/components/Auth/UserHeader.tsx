export const UserHeader = [
  {
    Header: '#',
    accessor: 'Id',
  },
  {
    Header: 'Action',
    accessor: 'Action',
    Cell: () => {
      return (
        <>
          <span role='button' className='svg-icon svg-icon-primary svg-icon-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                opacity='0.3'
                d='M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z'
                fill='black'
              />
              <path d='M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z' fill='black' />
            </svg>
          </span>
        </>
      );
    },
  },
  {
    Header: 'User Name',
    accessor: 'UserName',
  },

  {
    Header: 'First Name',
    accessor: 'FirstName',
  },
  {
    Header: 'Last Name',
    accessor: 'LastName',
  },
  {
    Header: 'Email Address',
    accessor: 'EmailAddress',
  },
  {
    Header: 'IsActive',
    accessor: (row: { Active: boolean }) => `${row.Active}`,
  },
];
