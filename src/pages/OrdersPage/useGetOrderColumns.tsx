import { Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { formatDate } from '../../utils/formatDate';
import FormattedPrice from '../../utils/FormattedPrice';

export default function useGetOrderColumns() {
  const columns: GridColDef[] = [
    {
      field: 'orderName',
      headerName: 'Napomena',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'orderTypeName',
      headerName: 'Vrsta džema',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'createdAt',
      headerName: 'Vreme unosa',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return <>{formatDate(row.createdAt || '', 'DD.MMM YY, HH:mm')}</>;
      },
    },
    {
      field: 'orderValue',
      headerName: 'Prihod',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent='center' sx={{ height: '100%' }}>
            <FormattedPrice price={row.orderValue} isBold />
          </Stack>
        );
      },
    },
    {
      field: 'orderExpenses',
      headerName: 'Rashod',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Stack
            color='primary.main'
            justifyContent='center'
            sx={{ height: '100%' }}
          >
            <FormattedPrice price={row.orderExpense} isExpense isBold />
          </Stack>
        );
      },
    },
    {
      field: 'orderProfit',
      headerName: 'Profit',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Stack
            justifyContent='center'
            sx={{ height: '100%' }}
            color='success.dark'
          >
            <FormattedPrice price={row.orderProfit} isBold />
          </Stack>
        );
      },
    },
  ];

  return columns;
}
