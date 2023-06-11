export function getISODateTime(date, time = "00:00") {
  let dateTime = new Date(`${date}T${time}`);
  return dateTime.toISOString();
}

export function getDate(dateString) {
  const dateObj = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return formattedDate;
}

export function getTime(isoString) {
  const time = isoString.split("T")[1].split(":").slice(0, 2).join(":");
  return time;
}
export function getCapitalizedString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function calculateStatus(startTime, endTime) {
  let status = "Upcoming";
  const currentTime = new Date().toISOString();

  if (currentTime < startTime) {
    // Calculate time difference in milliseconds
    const timeDifference = new Date(startTime) - new Date(currentTime);
    // Convert milliseconds to minutes
    const minutesBeforeStart = Math.floor(timeDifference / (1000 * 60));

    if (minutesBeforeStart <= 30) {
      status = "About to Start";
    } else {
      status = "Upcoming";
    }
  } else if (currentTime >= startTime && currentTime <= endTime) {
    status = "In Progress";
  } else {
    status = "Ended";
  }
  return status;
}
