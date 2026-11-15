import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DayAccordionGroups from './DayAccordionGroups';

type Item = { id: number; createdAt?: string; note: string };

const renderGroups = (items: Item[]) =>
  render(
    <DayAccordionGroups
      items={items}
      getKey={(i) => i.id}
      getDate={(i) => i.createdAt}
      getNote={(i) => i.note}
      renderTotals={(group) => `Ukupno: ${group.length}`}
      renderItem={(i) => <div>{`card-${i.id}`}</div>}
    />
  );

describe('DayAccordionGroups', () => {
  it('groups by day, opens only the newest day and shows totals and a common note', () => {
    renderGroups([
      { id: 1, createdAt: '2026-11-14T10:00:00', note: 'Bazar' },
      { id: 2, createdAt: '2026-11-14T12:00:00', note: 'Bazar' },
      { id: 3, createdAt: '2026-11-13T09:00:00', note: 'Drugo' },
    ]);

    expect(screen.getByText('14.11.2026. · Bazar')).toBeInTheDocument();
    expect(screen.getByText('13.11.2026. · Drugo')).toBeInTheDocument();
    expect(screen.getByText('Ukupno: 2')).toBeInTheDocument();
    expect(screen.getByText('Ukupno: 1')).toBeInTheDocument();
    expect(screen.getByText('card-1')).toBeInTheDocument();
    expect(screen.getByText('card-2')).toBeInTheDocument();
    expect(screen.queryByText('card-3')).toBeNull();
  });

  it('puts items without a date into their own group', () => {
    renderGroups([{ id: 1, note: '' }]);

    expect(screen.getByText('Bez datuma')).toBeInTheDocument();
  });
});
