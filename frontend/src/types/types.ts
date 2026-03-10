export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  description: string;
  is_completed: boolean;
  category: number;
  category_name: string;
  created_at: string;
}
