import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CupCostsSettings from './cupCosts/CupCostsSettings';
import FruitsSettings from './fruits/FruitsSettings';
import CupValuesSettings from './cupValues/CupValuesSettings';
import ConstantsSettings from './constants/ConstantsSetings';
import { routesSettings } from '../../../constants/routes';

export default function Settings() {
  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Podešavanja'}
        links={[
          {
            name: 'Osnovne postavke',
            href: routesSettings.root,
          },
        ]}
      />

      <Stack sx={{ pb: 1 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 'bold', fontSize: 20 }}
            >
              Džemići
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={3}>
              <Divider />

              <FruitsSettings />

              <Divider />

              <CupCostsSettings />

              <Divider />

              <CupValuesSettings />

              <Divider />

              <ConstantsSettings />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 'bold', fontSize: 20 }}
            >
              Čeri paradajz
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={3} sx={{ width: '100%' }}>
              <Divider />
              PLACEHOLDER
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Container>
  );
}
