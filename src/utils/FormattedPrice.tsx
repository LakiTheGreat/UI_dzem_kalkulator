import Typography, { type TypographyProps } from '@mui/material/Typography';

interface FormattedPriceProps {
  price: number | string;
  locales?: string;
  isBold?: boolean;
  isExpense?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  variant?: TypographyProps['variant'];
}

export default function FormattedPrice({
  price,
  variant = 'body1',
  locales = 'sr-RS',
  isBold = false,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
  isExpense = false,
}: FormattedPriceProps) {
  const numericPrice = typeof price === 'string' ? Number(price) : price;

  const formatted = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: 'RSD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericPrice);

  return (
    <Typography
      variant={variant}
      sx={{ fontWeight: isBold ? 'bold' : 'normal' }}
    >
      {isExpense && '- '}
      {formatted}
    </Typography>
  );
}
