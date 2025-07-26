import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDate = (date: Date | string, format?: string) => {
  const baseFormat = format || 'DD.MMM YY';

  if (!date) {
    return '';
  }

  return dayjs.utc(date).format(baseFormat);
};
