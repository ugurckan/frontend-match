export function formatNumber(value: number): string {
  if (!value) return "0";
  return value.toLocaleString("en");
}
