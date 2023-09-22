export const format = {
  id: (string) => string ? string.replace(/-/g, "") : string,
  string: (string) => string ? string.replace(/-/g, " ") : string,
  title: (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : string,
};