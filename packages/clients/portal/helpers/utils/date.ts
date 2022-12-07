export const isValidDate = (date) => {
  return !isNaN(date.getTime());
};

export const formatDate = (
  datetime: string,
  format?: Intl.DateTimeFormatOptions,
  locale?: string,
) => {
  try {
    const date = new Date(datetime);
    if (!isValidDate(date)) return null;
    return date.toLocaleDateString(
      locale || 'en-US',
      format || {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
    );
  } catch (error: any) {
    return null;
  }
};
