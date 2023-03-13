export const formatTime = (time) => {
  const timeValue = new Date(time);

  return timeValue.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
