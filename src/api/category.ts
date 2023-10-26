import { api } from '@/api/config/axios';
import { Category } from '@/types/entities';
const API_BASE_URI = '/categories';

async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>(`${API_BASE_URI}`, {
    withCredentials: true,
  });
  return response.data;
}

export { getCategories };
