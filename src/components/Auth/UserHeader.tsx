import { ViewSvg } from "../Svg/Svg";

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
          <ViewSvg clsName="svg-icon svg-icon-primary svg-icon-2" />
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
