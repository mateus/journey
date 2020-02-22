/* eslint-disable no-process-env */

console.log('From config', process.env);
export const isDevelopment = process.env.NODE_ENV === 'development';
export const publicURL = process.env.PUBLIC_URL;
