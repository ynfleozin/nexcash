export interface Expense {
  id: string;
  description: string;
  price: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
