export function getItem(name: string): string | null {
  const item = localStorage.getItem(name);
  return item ?? item;
}

export function setItem(name: string, value: string): void {
  localStorage.setItem(name, value);
}
