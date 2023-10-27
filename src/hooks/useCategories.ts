import { getCategories } from '@/api/categories';
import { Category } from '@/types/entities';
import { useEffect, useState } from 'react';

function useCategories(): Category[] {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  return categories;
}

export default useCategories;
