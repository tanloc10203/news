export function formatLink(str: string): string {
  str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  return str.replace(/\s+/g, '-');
}

export function cutNameUrl(str: string, first: number): string {
  const last = str.lastIndexOf('/');
  return str.slice(first, last);
}
