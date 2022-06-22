export const isValidDate = (date) => {
  return !isNaN(date.getTime());
};

export const formatDate = (
  datetime: string | number,
  format?: Intl.DateTimeFormatOptions,
  locale?: string,
) => {
  const date = new Date(+datetime * 1000);
  if (!isValidDate(date)) return null;
  return date.toLocaleDateString(
    locale || 'en-US',
    format || {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
  );
};
