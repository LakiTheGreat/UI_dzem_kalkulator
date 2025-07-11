import { Container, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import ConstantsSettings from './constants/ConstantsSetings';
import CupCostsSettings from './cupCosts/CupCostsSettings';
import CupValuesSettings from './cupValues/CupValuesSettings';
import FruitsSettings from './fruits/FruitsSettings';

const SECTION_DELAY_MS = 300;

export default function Settings() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const incrementStep = (index: number) => {
      const timeout = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, SECTION_DELAY_MS * index);
      timeouts.push(timeout);
    };

    [1, 2, 3, 4].forEach(incrementStep);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading='Podešavanja'
        links={[{ name: 'Osnovne postavke', href: routes.settings }]}
      />
      <Stack gap={3}>
        <Divider />

        {step >= 1 && (
          <>
            <FruitsSettings />
            <Divider />
          </>
        )}

        {step >= 2 && (
          <>
            <CupCostsSettings />
            <Divider />
          </>
        )}

        {step >= 3 && (
          <>
            <CupValuesSettings />
            <Divider />
          </>
        )}

        {step >= 4 && (
          <>
            <ConstantsSettings />
            <Divider />
          </>
        )}
      </Stack>
    </Container>
  );
}
