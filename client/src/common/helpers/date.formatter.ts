export const dateFormatter = (date: Date) =>
  new Date(date).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

