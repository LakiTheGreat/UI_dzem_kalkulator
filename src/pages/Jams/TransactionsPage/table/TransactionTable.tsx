import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import CustomToolbar from '../../../../components/CustomToolbar';
import { GRID_DEFAULT_LOCALE_TEXT } from '../../../../hooks/useGetDataGridTranslations';
import { Transaction } from '../../../../types/transactions';
import useGetTransactionColumns from './useGetTransactionColumns';

type Props = {
  data: Transaction[] | undefined;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function TransactionTable({
  data,
  handleDelete,
  handleEdit,
}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  function transformOrders(rawOrders: Transaction[]) {
    return rawOrders.map((order) => {
      const base = {
        ...order,
      };

      const baseAny = base as any;

      order.cups?.forEach((cup) => {
        const fieldName = `cup_${cup?.label?.trim().replace(/\s+/g, '_')}`;
        baseAny[fieldName] = cup.quantity ?? 0;
      });

      return baseAny;
    });
  }

  const transformedOrdersData = transformOrders(data || []);

  const columns = useGetTransactionColumns({
    data: data || [],
    handleDelete,
    handleEdit,
  });

  return (
    <DataGrid
      getRowClassName={(params) =>
        params.row.orderProfit < 0 ? 'negative-profit-row' : ''
      }
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        sorting: {
          sortModel: [{ field: 'createdAt', sort: 'desc' }],
        },
      }}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rows={transformedOrdersData || []}
      columns={columns}
      localeText={GRID_DEFAULT_LOCALE_TEXT}
      slots={{
        toolbar: CustomToolbar,
      }}
      showToolbar
    />
  );
}
