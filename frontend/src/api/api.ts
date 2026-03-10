import axios from "axios";
import { Category, Task } from "../types/types";
const API_BASE = import.meta.env.VITE_API_BASE as string;

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(`${API_BASE}/categories/`);
  return res.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const res = await axios.post<Category>(`${API_BASE}/categories/`, { name });
  return res.data;
};

export const getTasks = async (categoryId?: number |string): Promise<Task[]> => {
  const params = categoryId ? `?category_id=${categoryId}` : "";
  const res = await axios.get<Task[]>(`${API_BASE}/tasks/${params}`);
  return res.data;
};

export const createTask = async (
  task: string,
  categoryId: number,
): Promise<Task> => {
  const res = await axios.post<Task>(`${API_BASE}/tasks/`, {
    description: task,
    is_completed: false,
    category: categoryId,
  });
  return res.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_BASE}/tasks/${id}/`);
};

export const updateTask = async (
  id: number,
  updates: Partial<Task>
): Promise<Task> => {
  const res = await axios.patch<Task>(`${API_BASE}/tasks/${id}/`, updates);
  return res.data;
};
