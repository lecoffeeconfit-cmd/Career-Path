export function currency(value: number | null, fractionDigits = 0) {
  return value === null
    ? "Not available"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits,
      }).format(value);
}

export function number(value: number | null) {
  return value === null
    ? "Not available"
    : new Intl.NumberFormat("en-US").format(value);
}

export function growth(value: number | null) {
  return value === null ? "Not available" : `${value > 0 ? "+" : ""}${value}%`;
}

export const educationLabels = {
  "high-school": "High school + training",
  certificate: "Certificate",
  associate: "Associate degree",
  bachelor: "Bachelor’s degree",
  graduate: "Graduate degree",
} as const;
