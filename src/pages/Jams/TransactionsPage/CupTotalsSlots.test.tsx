/* eslint-disable testing-library/no-container, testing-library/no-node-access -- empty slots have no text to query by */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Transaction,
  TransactionStatusStrings,
} from '../../../types/transactions';
import CupTotalsSlots, { getCupLabels } from './CupTotalsSlots';

const tx = (cups: { label: string; quantity: number }[]): Transaction => ({
  id: 1,
  cups: cups.map((c, i) => ({ cupId: i, ...c })),
  status: TransactionStatusStrings.SOLD,
  createdAt: new Date('2026-11-14T10:00:00'),
  isDeleted: false,
  note: '',
});

describe('CupTotalsSlots', () => {
  it('keeps 212ml in the left slot and 370ml in the right one', () => {
    const days = [
      [tx([{ label: '370ml', quantity: 1 }, { label: '212ml', quantity: 3 }])],
      [tx([{ label: '212ml', quantity: 5 }])],
      [tx([{ label: '370ml', quantity: 2 }])],
    ];
    const labels = getCupLabels(days.flat());

    const slots = (day: Transaction[]) => {
      const { container, unmount } = render(
        <CupTotalsSlots transactions={day} labels={labels} />
      );
      const texts = Array.from(container.querySelectorAll('p')).map(
        (p) => p.textContent
      );
      unmount();
      return texts;
    };

    expect(labels).toEqual(['212ml', '370ml']);
    expect(slots(days[0])).toEqual(['212ml: 3', '370ml: 1']);
    expect(slots(days[1])).toEqual(['212ml: 5', '']);
    expect(slots(days[2])).toEqual(['', '370ml: 2']);
  });

  it('sums the quantities of all transactions of a day', () => {
    const { container } = render(
      <CupTotalsSlots
        transactions={[
          tx([{ label: '212ml', quantity: 1 }]),
          tx([{ label: '212ml', quantity: 2 }]),
        ]}
        labels={['212ml']}
      />
    );

    expect(container).toHaveTextContent('212ml: 3');
  });
});
