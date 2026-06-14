/**
 * Timezone utilities to enforce Asia/Singapore (SGT) timezone in the frontend.
 */

export function getSingaporeDateString(date: Date = new Date()): string {
  // Returns "YYYY-MM-DD" in Asia/Singapore
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function formatToSingaporeDate(
  dateInput: Date | string | number,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
): string {
  if (!dateInput) return "";
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Singapore',
    ...options
  }).format(date);
}

export function formatToSingaporeTime(
  dateInput: Date | string | number,
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
): string {
  if (!dateInput) return "";
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Singapore',
    ...options
  }).format(date);
}

export function formatToSingaporeDateTime(dateInput: Date | string | number): string {
  if (!dateInput) return "";
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  const dateStr = formatToSingaporeDate(date, { day: 'numeric', month: 'short' });
  const timeStr = formatToSingaporeTime(date, { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${dateStr} • ${timeStr}`;
}

export function getSingaporeDate(): Date {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(new Date());

  const year = parseInt(parts.find(p => p.type === 'year')?.value || '2026', 10);
  const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10) - 1;
  const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
  let hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  if (hour === 24) hour = 0;
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
  const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);

  return new Date(year, month, day, hour, minute, second);
}

export function getSingaporeTimeTodayRange(): { from: Date; to: Date } {
  const nowSgt = getSingaporeDate();
  const from = new Date(nowSgt);
  from.setHours(0, 0, 0, 0);
  const to = new Date(nowSgt);
  return { from, to };
}
