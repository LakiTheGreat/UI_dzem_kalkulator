import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { ReactNode, useMemo } from 'react';

type Props<T> = {
  items: T[];
  getKey: (item: T) => number;
  getDate: (item: T) => string | Date | undefined;
  getNote: (item: T) => string | undefined;
  renderItem: (item: T) => ReactNode;
  renderTotals: (items: T[]) => ReactNode;
};

const DAY_KEY_FORMAT = 'YYYY-MM-DD';
const NO_DATE_KEY = '';

// A note is "common" when more than half of the day's items share it.
const getCommonNote = (notes: (string | undefined)[]): string | null => {
  const counts = new Map<string, number>();
  notes.forEach((note) => {
    const trimmed = note?.trim();
    if (trimmed) counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
  });

  const [top] = Array.from(counts).sort((a, b) => b[1] - a[1]);
  return top && top[1] > notes.length / 2 ? top[0] : null;
};

// Day accordions grouped by the local calendar day; keeps the incoming order.
export default function DayAccordionGroups<T>({
  items,
  getKey,
  getDate,
  getNote,
  renderItem,
  renderTotals,
}: Props<T>) {
  const groups = useMemo(() => {
    const byDay = new Map<string, T[]>();
    items.forEach((item) => {
      const date = getDate(item);
      const day = date ? dayjs(date).format(DAY_KEY_FORMAT) : NO_DATE_KEY;
      byDay.set(day, [...(byDay.get(day) ?? []), item]);
    });
    return Array.from(byDay, ([day, dayItems]) => ({
      day,
      items: dayItems,
      commonNote: getCommonNote(dayItems.map(getNote)),
    }));
  }, [items, getDate, getNote]);

  return (
    <Stack gap={1}>
      {groups.map((group, index) => (
        <Accordion
          key={group.day}
          defaultExpanded={index === 0}
          disableGutters
          sx={{
            borderRadius: 1,
            boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 0 6px rgba(0,0,0,0.12)',
            '&:before': { display: 'none' },
          }}
          slotProps={{ transition: { unmountOnExit: true } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              columnGap={3}
              rowGap={0.5}
              sx={{ width: '100%', pr: 1, justifyContent: 'space-between' }}
            >
              <Typography fontWeight='bold'>
                {group.day
                  ? dayjs(group.day).format('DD.MM.YYYY.')
                  : 'Bez datuma'}
                {group.commonNote && ` · ${group.commonNote}`}
              </Typography>
              <Box color='text.secondary'>{renderTotals(group.items)}</Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2 }}>
            <Grid container spacing={3}>
              {group.items.map((item) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={getKey(item)}>
                  {renderItem(item)}
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
