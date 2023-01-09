export function getItem(name: string) {
  const item = localStorage.getItem(name);
  return !!item && item;
}

export function setItem(name: string, value: string) {
  localStorage.setItem(name, value);
}
