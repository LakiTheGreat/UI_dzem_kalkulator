import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import DataGridRowActions from '../../../components/DataGridRowActions';
import { Order } from '../../../types/orders';
import { formatDate } from '../../../utils/formatDate';
import FormattedPrice from '../../../utils/FormattedPrice';

type Props = {
  data: Order[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function useGetOrderColumns({
  data,
  handleEdit,
  handleDelete,
}: Props) {
  const uniqueCups = new Set<string>();
  data.forEach((order) =>
    order.cups?.forEach((cup) => uniqueCups.add(cup.label.trim()))
  );

  const columns: GridColDef[] = [
    {
      field: 'orderName',
      headerName: 'Napomena',
      flex: 1,
      minWidth: 170,
    },
    {
      field: 'orderTypeName',
      headerName: 'Vrsta džema',
      flex: 1,
      minWidth: 150,
    },

    {
      field: 'createdAt',
      headerName: 'Vreme unosa',
      flex: 1,
      minWidth: 170,
      renderCell: ({ row }) => {
        return <>{formatDate(row.createdAt || '', 'DD.MMM YY, HH:mm')}</>;
      },
    },
    {
      field: 'orderValue',
      headerName: 'Prihod',
      flex: 1,
      minWidth: 150,
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
      minWidth: 150,
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
      minWidth: 150,
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
    {
      field: 'profitMargin',
      headerName: 'Profitna marža',
      flex: 1,
      minWidth: 150,
      valueGetter: (value) => Number(String(value).replace('%', '')),
      renderCell: ({ row }) => {
        return (
          <Stack alignItems='center' sx={{ height: '100%' }} direction='row'>
            <Typography>{row.profitMargin}</Typography>
          </Stack>
        );
      },
    },
  ];

  // ✅ Dynamic cup columns
  uniqueCups.forEach((label) => {
    columns.push({
      field: `cup_${label}`,
      headerName: `${label}`,
      flex: 1,
      minWidth: 100,
    });
  });

  columns.push(
    {
      field: 'baseFruitIsFree',
      headerName: 'Besplatna osnova',
      flex: 1,
      minWidth: 170,
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent='center' sx={{ height: '100%' }}>
            {row.baseFruitIsFree ? (
              <CheckIcon color='success' />
            ) : (
              <CloseIcon color='error' />
            )}
          </Stack>
        );
      },
    },
    {
      field: '',
      headerName: '',
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,

      renderCell: ({ row }) => {
        return (
          <DataGridRowActions
            onEdit={() => handleEdit(row.id)}
            onDelete={() => handleDelete(row.id)}
          />
        );
      },
    }
  );

  return columns;
}
