export const getStartOfToday = () => {
  const now = new Date();
  now.setUTCHours(5, 0, 0, 0);
  return now;
};

export const getStartOfTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(5, 0, 0, 0);
  return tomorrow;
};
