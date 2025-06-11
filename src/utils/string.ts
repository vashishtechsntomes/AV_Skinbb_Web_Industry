export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelToTitle(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function truncate(str: string, max = 100) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

export function kebabToTitle(str: string) {
  return str.split("-").map(capitalize).join(" ");
}
