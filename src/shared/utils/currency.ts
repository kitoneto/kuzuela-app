type Currency = 'AOA' | 'USD' | 'EUR' | 'MZN' | 'BRL';

const currencyLocales: Record<Currency, string> = {
  AOA: 'pt-AO',
  USD: 'en-US',
  EUR: 'pt-PT',
  MZN: 'pt-MZ',
  BRL: 'pt-BR',
};

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  return new Intl.NumberFormat(currencyLocales[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'AOA' ? 0 : 2,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return formatCurrency(amount, 'USD');
}

export function formatAOA(amount: number): string {
  return formatCurrency(amount, 'AOA');
}
