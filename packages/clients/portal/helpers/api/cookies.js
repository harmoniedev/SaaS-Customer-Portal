import { serialize } from 'cookie';

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options = {}) => {
  console.log()
  const stringValue = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  const modifiedOptions = options;
  if ('maxAge' in modifiedOptions) {
    modifiedOptions.expires = new Date(Date.now() + options.maxAge);
    modifiedOptions.maxAge /= 1000;
  }

  // Set default path
  if (!modifiedOptions.path) {
    modifiedOptions.path = '/';
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), modifiedOptions));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = (req, res, next) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return next();
};

export default cookies;