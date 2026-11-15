/* eslint-disable testing-library/no-node-access -- the accordion summary has no accessible query for its slots */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import {
  Transaction,
  TransactionStatusStrings,
} from '../../../types/transactions';
import TransactionDayGroups from './TransactionDayGroups';

let nextId = 1;

const tx = (
  createdAt: string,
  cups: { label: string; quantity: number }[],
  note = ''
): Transaction => ({
  id: nextId++,
  cups: cups.map((c, i) => ({ cupId: i, ...c })),
  status: TransactionStatusStrings.SOLD,
  createdAt: new Date(createdAt),
  isDeleted: false,
  note,
});

const renderGroups = (transactions: Transaction[], showActions = true) =>
  render(
    <TransactionDayGroups
      transactions={transactions}
      handleDelete={jest.fn()}
      handleEdit={jest.fn()}
      showActions={showActions}
    />
  );

const summaries = () =>
  Array.from(document.querySelectorAll('.MuiAccordionSummary-root'));

describe('TransactionDayGroups', () => {
  it('groups transactions by calendar day and opens only the newest day', () => {
    renderGroups([
      tx('2026-11-14T17:00:00', [{ label: '212ml', quantity: 1 }]),
      tx('2026-11-14T09:00:00', [{ label: '212ml', quantity: 2 }]),
      tx('2026-11-13T12:00:00', [{ label: '212ml', quantity: 4 }]),
    ]);

    expect(summaries()).toHaveLength(2);
    expect(summaries()[0]).toHaveTextContent('14.11.2026.');
    expect(summaries()[0]).toHaveTextContent('212ml: 3');
    expect(summaries()[1]).toHaveTextContent('13.11.2026.');
    expect(summaries()[0]).toHaveAttribute('aria-expanded', 'true');
    expect(summaries()[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps 212ml in the left slot and 370ml in the right one', () => {
    renderGroups([
      tx('2026-11-14T10:00:00', [
        { label: '370ml', quantity: 1 },
        { label: '212ml', quantity: 3 },
      ]),
      tx('2026-11-13T10:00:00', [{ label: '212ml', quantity: 5 }]),
      tx('2026-11-12T10:00:00', [{ label: '370ml', quantity: 2 }]),
    ]);

    const slots = (summary: Element) =>
      Array.from(summary.querySelectorAll('p'))
        .map((p) => p.textContent)
        .slice(-2);

    const [both, only212, only370] = summaries();
    expect(slots(both)).toEqual(['212ml: 3', '370ml: 1']);
    expect(slots(only212)).toEqual(['212ml: 5', '']);
    expect(slots(only370)).toEqual(['', '370ml: 2']);
  });

  it('shows a note shared by more than half of the day', () => {
    renderGroups([
      tx('2026-11-14T10:00:00', [], 'Bazar na Vraćaru'),
      tx('2026-11-14T11:00:00', [], 'Bazar na Vraćaru'),
      tx('2026-11-14T12:00:00', [], 'Poklon'),
      tx('2026-11-13T10:00:00', [], 'Bazar na Vraćaru'),
      tx('2026-11-13T11:00:00', [], 'Poklon'),
    ]);

    expect(summaries()[0]).toHaveTextContent('· Bazar na Vraćaru');
    expect(summaries()[1]).not.toHaveTextContent('·');
  });

  it('shows the Izmeni/Obriši buttons only when showActions is on', () => {
    const data = [tx('2026-11-14T10:00:00', [])];

    const { unmount } = renderGroups(data, true);
    expect(screen.getByRole('button', { name: 'Izmeni' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Obriši' })).toBeInTheDocument();
    unmount();

    renderGroups(data, false);
    expect(screen.queryByRole('button', { name: 'Izmeni' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Obriši' })).toBeNull();
  });
});
