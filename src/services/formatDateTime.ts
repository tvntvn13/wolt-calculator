export const formatDateTime = (date: Date): string => {
  const formatYear = (date: Date) => date.getFullYear().toString();
  const formatMonth = (date: Date) => (date.getMonth() + 1).toString().padStart(2, '0');
  const formatDate = (date: Date) => date.getDate().toString().padStart(2, '0');
  const formatHours = (date: Date) => date.getHours().toString().padStart(2, '0');
  const formatMinutes = (date: Date) => date.getMinutes().toString().padStart(2, '0');

  return `${formatYear(date)}-${formatMonth(date)}-${formatDate(date)}T${formatHours(
    date
  )}:${formatMinutes(date)}`;
};
