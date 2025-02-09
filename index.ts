export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  currency: string;
}

export interface CurrencyRate {
  code: string;
  rate: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}