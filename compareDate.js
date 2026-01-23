/**
 * Compares two date strings and returns true if date1 is newer than date2.
 * works with "Wed Sep 24 16:56:32 +0000 2025" and "2026-01-01"
 */
export default function isDateGreater(date1, date2) {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();

  if (isNaN(d1) || isNaN(d2)) return false;

  return d1 > d2;
}

