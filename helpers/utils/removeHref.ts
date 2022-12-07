export const removeHref = (href = '') =>
  href
    .replace(/\.en\.html/g, '')
    .replace(/\.fr\.html/g, '')
    .replace(/\.html/g, '')
    .replace(/html\//g, '');
