export const Header = [
  {
    Header: 'Field',
    accessor: 'Field',
  },

  {
    Header: 'Label',
    accessor: (row: { Label: string }) => `${row.Label}`,
  },
  {
    Header: 'Field Type',
    accessor: 'Type',
  },
  {
    Header: 'Is System Field',
    accessor: 'SystemField',
  },
  {
    Header: 'IsRemoved',
    accessor: 'IsRemoved',
  },
  {
    Header: 'IsActive',
    accessor: (row: { Active: boolean }) => `${row.Active}`,
  },
];
