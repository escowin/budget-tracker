export const format = {
  // removes all hyphens
  id: (string) => string ? string.replace(/-/g, "") : string,
  // replaces all hyphens with spaces
  string: (string) => string ? string.replace(/-/g, " ") : string,
  // sentence case
  title: (string) => string ? string.replace(/-/g, " ").charAt(0).toUpperCase() + string.slice(1) : string,
};