export function getISODateTime(date, time = '00:00') {
  let dateTime = new Date(`${date}T${time}`);
  return dateTime.toISOString();
}

export function formatTimeForInput(ISOString) {
  let dateTime = new Date(ISOString);
  let time = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return time;
}

export function formatToHumanReadableTime(ISOString) {
  let dateTime = new Date(ISOString);
  let time = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return time;
}

export function formatToHumanReadableDate(ISOString) {
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  let dateTime = new Date(ISOString);
  let date = dateTime.toLocaleDateString(undefined, dateOptions);

  return date;
}

export function formatDateForInput(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentDate() {
  const date = new Date();
  const ISODate = date.toISOString().substring(0, 10);

  return ISODate;
}

export function getDate(dateString) {
  const dateObj = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
  return formattedDate;
}

export function getTime(isoString) {
  const time = isoString.split('T')[1].split(':').slice(0, 2).join(':');
  return time;
}
export function getCapitalizedString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function calculateStatus(startTime, endTime) {
  let status = 'Upcoming';
  const currentTime = new Date().toISOString();

  if (currentTime < startTime) {
    // Calculate time difference in milliseconds
    const timeDifference = new Date(startTime) - new Date(currentTime);
    // Convert milliseconds to minutes
    const minutesBeforeStart = Math.floor(timeDifference / (1000 * 60));

    if (minutesBeforeStart <= 30) {
      status = 'About to Start';
    } else {
      status = 'Upcoming';
    }
  } else if (currentTime >= startTime && currentTime <= endTime) {
    status = 'In Progress';
  } else {
    status = 'Ended';
  }
  return status;
}
