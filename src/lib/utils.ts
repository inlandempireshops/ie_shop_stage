export function formatPrice(amount:string | number, currencyCode: string) {
  const currentAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // If parsing fails
  if(isNaN(currentAmount)) return `$${amount}`;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(currentAmount)
}