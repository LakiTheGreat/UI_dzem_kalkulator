import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import CustomToolbar from '../../../components/CustomToolbar';
import { GRID_DEFAULT_LOCALE_TEXT } from '../../../hooks/useGetDataGridTranslations';
import { BouquetTransaction } from '../../../types/bouguets';
import useGetTransactionColumns from './useGetBouquetColumns';

type Props = {
  data: BouquetTransaction[] | undefined;
  handleDelete: (transaction: BouquetTransaction) => void;
  handleEdit: (id: number) => void;
};

export default function BouquetTable({
  data,
  handleDelete,
  handleEdit,
}: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

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
      rows={data || []}
      columns={columns}
      localeText={GRID_DEFAULT_LOCALE_TEXT}
      slots={{
        toolbar: CustomToolbar,
      }}
      showToolbar
    />
  );
}
