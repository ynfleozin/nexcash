export interface Expense {
  id: string;
  description: string;
  price: number;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
