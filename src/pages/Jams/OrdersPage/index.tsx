import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Id } from 'react-toastify';

import { useGetFruitsQuery } from '../../../api/fruitsSlice';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from '../../../api/ordersApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MONTHS, ORDER_WIDTH, YEARS } from '../../../constants';
import { routesJam } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/reduxStoreHooks';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { BG_COLOR_INPUT } from '../../../theme/palette';
import { OrderParams, PRICE_STATUS } from '../../../types/orders';
import filterFruits from '../../../utils/filterFruits';
import FormattedPrice from '../../../utils/FormattedPrice';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import OrderCard from './OrderCard';
import OrderDetailsDialog from './OrderDetailsDialog';
import OrdersTable from './table/OrdersTable';

export default function OrdersPage() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);

  const [value, setValue] = useState<number>(0);

  const [toastId, setToastId] = useState<Id>('');
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const defaultParams = {
    orderTypeId: 0,
    priceStatus: PRICE_STATUS.ALL,
    year: 0,
    month: 0,
  };

  const param = {
    ...defaultParams,
  };

  const [params, setParams] = useState<OrderParams>(param);

  const { data, isFetching } = useGetAllOrdersQuery(params);
  const { data: fruits, isLoading: isLoadingFruits } = useGetFruitsQuery();

  const [deleteOrder, { data: deletedOrderData, error }] =
    useDeleteOrderMutation();

  const filteredFruits = userId === 1 ? fruits : filterFruits(fruits);

  const handleDelete = async (id: number) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu seriju?',
      contentSubtitle: 'Posle nema nazad (ima)!',
      confirmLabel: 'Da',
    });

    if (isConfirmed) {
      deleteOrder(id);
      setToastId(setToastIsLoading(`Sačekaj....`));
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/${routesJam.orders}/${id}`);
  };

  useApiSuccessNotification({
    data: deletedOrderData,
    message: 'Porudžbina uspešno obrisana',
    toastId,
  });

  useApiErrorNotification({
    error,
    toastId,
  });

  return (
    <Container>
      <HeaderBreadcrumbs
        heading={'Proizvodne serije'}
        links={[
          {
            name: 'Džemovi',
            href: routesJam.orders,
          },
        ]}
        action={
          <IconButton
            color='primary'
            onClick={() => navigate(`/${routesJam.orders}/new`)}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={3}>
        <Container maxWidth='sm'>
          <Stack gap={3}>
            {isLoadingFruits && (
              <Stack gap={2}>
                <Skeleton variant='rounded' height={56} />
                <Skeleton variant='rounded' height={56} />
                <Skeleton variant='rounded' height={41} />
              </Stack>
            )}

            {!isLoadingFruits && (
              <Stack gap={2}>
                <Stack direction='row' gap={2}>
                  <FormControl fullWidth>
                    <InputLabel>Vrsta džema</InputLabel>
                    <Select
                      sx={{ bgcolor: BG_COLOR_INPUT }}
                      value={params.orderTypeId}
                      label='Vrsta džema'
                      onChange={(e) =>
                        setParams({
                          ...params,
                          orderTypeId: Number(e.target.value),
                        })
                      }
                    >
                      <MenuItem value={0}>Prikaži sve</MenuItem>
                      {filteredFruits?.map((fruit) => (
                        <MenuItem key={fruit.id} value={fruit.id}>
                          {fruit.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Besplatna osnova</InputLabel>
                    <Select
                      sx={{ bgcolor: BG_COLOR_INPUT }}
                      value={params.priceStatus}
                      label='Besplatna osnova'
                      onChange={(e) =>
                        setParams({
                          ...params,
                          priceStatus: Number(e.target.value),
                        })
                      }
                    >
                      <MenuItem value={PRICE_STATUS.ALL}>Prikaži sve</MenuItem>
                      <MenuItem value={PRICE_STATUS.ONLY_FREE}>
                        Besplatna osnova
                      </MenuItem>
                      <MenuItem value={PRICE_STATUS.ONLY_PAID}>
                        Plaćena osnova
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction='row' gap={2}>
                  <FormControl fullWidth>
                    <InputLabel>Godina</InputLabel>
                    <Select
                      sx={{ bgcolor: BG_COLOR_INPUT }}
                      value={params.year}
                      label='Godina'
                      onChange={(e) =>
                        setParams({
                          ...params,
                          year: Number(e.target.value),
                        })
                      }
                    >
                      <MenuItem value={0}>Prikaži sve</MenuItem>
                      {YEARS?.map((year) => (
                        <MenuItem key={year.id} value={year.value}>
                          {year.menuItemLabel}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Mesec</InputLabel>
                    <Select
                      sx={{ bgcolor: BG_COLOR_INPUT }}
                      value={params.month}
                      label='Mesec'
                      onChange={(e) =>
                        setParams({
                          ...params,
                          month: Number(e.target.value),
                        })
                      }
                    >
                      <MenuItem value={0}>Prikaži sve</MenuItem>
                      {MONTHS?.map((month) => (
                        <MenuItem key={month.id} value={month.value}>
                          {month.menuItemLabel}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Button
                  variant='outlined'
                  startIcon={<RefreshIcon />}
                  onClick={() => setParams(defaultParams)}
                  size='large'
                  sx={{ bgcolor: BG_COLOR_INPUT }}
                  loading={isFetching}
                >
                  Resetuj filtere
                </Button>
              </Stack>
            )}

            {isFetching && <Skeleton variant='rounded' height={120} />}
            {!isFetching && (
              <Stack>
                {data?.totalCups.map((cup) => (
                  <Stack direction='row' key={cup.label} gap={1}>
                    <Typography sx={{ width: ORDER_WIDTH }}>
                      Br. teglica od {cup.label}:
                    </Typography>
                    <Typography>{cup.numberOf}</Typography>
                  </Stack>
                ))}
                <Stack direction='row' gap={1}>
                  <Typography sx={{ width: ORDER_WIDTH }}>
                    Ukupni prihod:
                  </Typography>
                  <FormattedPrice price={data?.totalValue ?? 0} />
                </Stack>
                <Stack direction='row' color='primary.main' gap={1}>
                  <Typography sx={{ fontWeight: 'bold', width: ORDER_WIDTH }}>
                    Ukupni rashod:
                  </Typography>
                  <Stack sx={{ ml: -1.3 }}>
                    <FormattedPrice
                      price={data?.totalExpense ?? 0}
                      isBold
                      isExpense
                    />
                  </Stack>
                </Stack>
                <Stack direction='row' color='success.dark' gap={1}>
                  <Typography sx={{ fontWeight: 'bold', width: ORDER_WIDTH }}>
                    Ukupni profit:
                  </Typography>
                  <FormattedPrice price={data?.totalProfit ?? 0} isBold />
                </Stack>
              </Stack>
            )}
          </Stack>
        </Container>
        <Divider />
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
              <Stack gap={3}>
                <Skeleton variant='rounded' height={24} width={185} />
                <Skeleton
                  variant='rounded'
                  height={354}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton variant='rounded' height={354} sx={{ mx: 3 }} />
              </Stack>
            )}

            {!isFetching && (
              <Typography>
                Broj proizvodnih serija: {data?.orders?.length}
              </Typography>
            )}

            <TabPanel value={0}>
              <Grid container spacing={3}>
                {!isFetching &&
                  data?.orders?.map((order) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={order.id}>
                      <OrderCard
                        order={order}
                        setSelectedId={setSelectedId}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                  ))}
                {data?.orders?.length === 0 && (
                  <Typography textAlign='center' sx={{ mt: 3, width: '100%' }}>
                    Nema još ništa od ove voćke.
                  </Typography>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={1}>
              {!isFetching && (
                <OrdersTable
                  data={data?.orders}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              )}
            </TabPanel>
          </Stack>
        </TabContext>
      </Stack>

      {selectedId && (
        <OrderDetailsDialog
          selectedId={selectedId}
          open={!!selectedId}
          handleClose={() => setSelectedId(null)}
        />
      )}
      <Confirmation />
    </Container>
  );
}
