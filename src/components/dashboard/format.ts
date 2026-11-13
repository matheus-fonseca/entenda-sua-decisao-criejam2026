const number = new Intl.NumberFormat("pt-BR");
const one = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const formatNumber = (value: number) => number.format(Math.round(value));
/** Recebe uma fração (0,873) e devolve "87,3%". */
export const formatPercent = (value: number, digits = 1) =>
  digits === 0 ? `${Math.round(value * 100)}%` : `${one.format(value * 100)}%`;
export const formatDecimal = (value: number) => one.format(value);
export const formatMoney = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
