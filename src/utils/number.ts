export function formatCurrency(
  amount: number,
  options?: {
    locale?: string;
    currency?: string;
    useAbbreviation?: boolean;
    decimalPlaces?: number;
  },
) {
  const {
    locale = "en-IN",
    currency = "INR",
    useAbbreviation = true,
    decimalPlaces = 2,
  } = options || {};

  if (useAbbreviation) {
    if (amount >= 1e7) {
      const val = amount / 1e7;
      return `${val.toFixed(decimalPlaces ?? 3).replace(/\.?0+$/, "")}Cr`;
    } else if (amount >= 1e5) {
      const val = amount / 1e5;
      return `${val.toFixed(decimalPlaces ?? 3).replace(/\.?0+$/, "")}L`;
    } else if (amount >= 1e3) {
      const val = amount / 1e3;
      return `${val.toFixed(decimalPlaces ?? 3).replace(/\.?0+$/, "")}k`;
    }
  }

  // Check if the number is a whole number
  const isWholeNumber = Number.isInteger(amount);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: isWholeNumber ? 0 : (decimalPlaces ?? 2),
  }).format(amount);
}

export function formatNumber(amount: number, locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function abbreviateNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}
