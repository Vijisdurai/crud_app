// FILE: src/utils/formatDate.js

/**
 * Converts a UTC ISO datetime string to local timezone,
 * formatted as YYYY-MM-DD HH:mm.
 *
 * @param {string|null|undefined} isoString - UTC datetime string from server
 * @returns {string} Formatted local datetime or empty string if falsy
 */
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
