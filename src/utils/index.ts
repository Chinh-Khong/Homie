export const formatCurrency = (value: string | number): string => {
  const numeric = String(value).replace(/[^0-9]/g, "");
  if (!numeric) return "";
  return new Intl.NumberFormat("vi-VN").format(Number(numeric));
};
