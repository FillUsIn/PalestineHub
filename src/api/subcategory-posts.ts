import { api } from "@/api/config/axios";
import { CreatePostDTO } from "@/types/dtos";
import { Post } from "@/types/entities";

async function createSubcategoryPost(subCategoryName: string, createPostDTO: CreatePostDTO): Promise<Post> {
  const response = await api.post<Post>(`/posts/subcategory/${subCategoryName}`, createPostDTO);
  return response.data;
}

export { createSubcategoryPost };
