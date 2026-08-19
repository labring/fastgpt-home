export function parseCompactCount(value: string) {
  let parsedValue = parseFloat(value.replace(/,/g, '').replace(/\+/g, ''));

  if (value.includes('w')) {
    parsedValue *= 10000;
  }

  return parsedValue;
}

export function formatCount(value: number) {
  return value.toLocaleString();
}
