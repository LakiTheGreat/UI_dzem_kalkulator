import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Container,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetTransactionsQuery } from '../../api/transactionsApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import TransactionCard from './TransactionCard';

export default function TransactionsPage() {
  const { data, isFetching } = useGetTransactionsQuery();
  const navigate = useNavigate();

  const [value, setValue] = useState<number>(0);

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Pregled',
            href: routes.inventory,
          },
        ]}
        action={
          <IconButton
            color='primary'
            onClick={() => navigate(`/${routes.orders}/${routes.new}`)}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack>
        <TabContext value={value}>
          <TabList
            onChange={(e, newValue) => setValue(newValue)}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{ mt: -2 }}
          >
            <Tab label={'Kartice'} value={0} />
            <Tab label={'Tabela'} value={1} />
          </TabList>
          <Stack gap={3}>
            {isFetching && (
              <Stack>
                <Skeleton
                  variant='rounded'
                  height={234}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton
                  variant='rounded'
                  height={234}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton
                  variant='rounded'
                  height={234}
                  sx={{ mt: 3, mx: 3 }}
                />
              </Stack>
            )}

            <TabPanel value={0}>
              <Grid container spacing={3}>
                {!isFetching &&
                  data?.map((transaction) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
                      <TransactionCard
                        transaction={transaction}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                  ))}
                {data?.length === 0 && (
                  <Typography textAlign='center' sx={{ mt: 3, width: '100%' }}>
                    Nema još transakcija.
                  </Typography>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={1}>TABELA</TabPanel>
          </Stack>
        </TabContext>
      </Stack>
    </Container>
  );
}
