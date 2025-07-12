export function formatLocalDateTime(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) return 'Invalid date';

  return date.toLocaleString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
