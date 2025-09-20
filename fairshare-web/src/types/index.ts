export interface Person {
  id: string;
  name: string;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
}

export interface BillItem {
  id: string;
  foodName: string;
  price: number;
}

export interface FoodAssignment {
  foodIndex: number;
  assignedPeople: string[];
}

export interface PersonDues {
  person: string;
  amount: number;
}

export interface BillData {
  people: Person[];
  foodItems: FoodItem[];
  tipPercent: number;
  tax: number;
  subtotal: number;
  total: number;
}

export interface AppState {
  currentStep: number;
  people: Person[];
  billItems: BillItem[];
  foodAssignments: FoodAssignment[];
  tipPercent: number;
  tax: number;
  subtotal: number;
  total: number;
}
