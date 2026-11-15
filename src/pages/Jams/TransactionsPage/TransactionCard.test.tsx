import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import {
  Transaction,
  TransactionStatusStrings,
} from '../../../types/transactions';
import TransactionCard from './TransactionCard';

const transaction: Transaction = {
  id: 1,
  cups: [],
  status: TransactionStatusStrings.SOLD,
  createdAt: new Date('2026-11-14T10:00:00'),
  isDeleted: false,
  note: '',
};

const renderCard = (showActions: boolean) =>
  render(
    <TransactionCard
      transaction={transaction}
      handleDelete={jest.fn()}
      handleEdit={jest.fn()}
      showActions={showActions}
    />
  );

describe('TransactionCard', () => {
  it('shows the Izmeni/Obriši buttons only when showActions is on', () => {
    const { unmount } = renderCard(true);
    expect(screen.getByRole('button', { name: 'Izmeni' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Obriši' })).toBeInTheDocument();
    unmount();

    renderCard(false);
    expect(screen.queryByRole('button', { name: 'Izmeni' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Obriši' })).toBeNull();
  });
});
