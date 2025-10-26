export const calculateProfitMargin = (
  totalIncome: number,
  totalExpenses: number
) => {
  const profitMargin = (
    ((totalIncome - totalExpenses) / totalExpenses) *
    100
  ).toFixed(0);

  return profitMargin;
};
