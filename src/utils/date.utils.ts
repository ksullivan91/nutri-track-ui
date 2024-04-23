export const getStartOfToday = () => {
  // Create a date object for now
  const now = new Date();
  // Set to the start of the day in UTC-5
  now.setUTCHours(5, 0, 0, 0); // Since UTC-5 adds 5 hours to get to UTC
  return now;
};

export const getStartOfTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); // Move to the next day
  tomorrow.setUTCHours(5, 0, 0, 0); // Set to the start of the day in UTC-5
  return tomorrow;
};
