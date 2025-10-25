import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Grid, IconButton, Tab } from '@mui/material';
import { useState } from 'react';

import { useGetAllTomatoOrderQuery } from '../../../api/tomatoesApi';
import GeneralDialog from '../../../components/GeneralDialog';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';
import CreateTomatoOrder from './form/CreateTomatoOrder';
import TomatoTransactionCard from './TomatoOrderCard';
import { Skeleton } from '@mui/material';

export default function TomatoesOrdersPage() {
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const { data, isFetching } = useGetAllTomatoOrderQuery();

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleEdit = (id: number) => {
    console.log(id);
  };
  return (
    <Container>
      <HeaderBreadcrumbs
        heading={'Proizvodne serije'}
        links={[
          {
            name: 'Čeri paradajz',
            href: routesTomatoes.root,
          },
        ]}
        action={
          <IconButton color='primary' onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
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
        <TabPanel value={0}>
          <Grid container spacing={3}>
            {isFetching && (
              <>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Skeleton variant='rounded' height={200} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Skeleton variant='rounded' height={200} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Skeleton variant='rounded' height={200} />
                </Grid>
              </>
            )}
            {!isFetching &&
              data?.map((transaction) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
                  <TomatoTransactionCard
                    order={transaction}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                </Grid>
              ))}
          </Grid>
        </TabPanel>
        <TabPanel value={1}>Ce bude tabela</TabPanel>
      </TabContext>

      {!data?.length && !isFetching && 'Još nema serija'}

      <GeneralDialog
        open={open}
        handleClose={() => setOpen(false)}
        maxWidth='xs'
        title={'Napravi turu čeri paradajza'}
      >
        <CreateTomatoOrder setOpen={setOpen} />
      </GeneralDialog>
    </Container>
  );
}
