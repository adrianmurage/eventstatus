export function getISODateTime(date, time = '00:00') {
  let dateTime = new Date(`${date}T${time}`);
  return dateTime.toISOString();
}
