import { api } from "@/api/config/axios";
import { CreatePostDTO } from "@/types/dtos";
import { Post } from "@/types/entities";

const API_BASE_URI = "/posts";
async function createSubcategoryPost(
  subCategoryName: string,
  createPostDTO: CreatePostDTO
): Promise<Post> {
  const response = await api.post<Post>(
    `${API_BASE_URI}/subcategory/${subCategoryName}`,
    createPostDTO,
    { withCredentials: true }
  );
  return response.data;
}

async function getSubcategoryPosts(
  subCategoryName: string,
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<Post>> {
  const response = await api.get<PagedResponse<Post>>(
    `${API_BASE_URI}/subcategory/${subCategoryName}`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
}

type PagedResponse<T> = {
  content: T[];
  // Add other paging properties like totalElements, totalPages, etc if needed
};

async function getCategoryPosts(
  categoryName: string,
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<Post>> {
  const response = await api.get<PagedResponse<Post>>(
    `${API_BASE_URI}/category/${categoryName}`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
}

async function getPostById(postId: string): Promise<PagedResponse<Post>> {
  const response = await api.get<PagedResponse<Post>>(
    `${API_BASE_URI}/${postId}`,
    {}
  );
  return response.data;
}

async function likePost(postId: string): Promise<PagedResponse<Post>> {
  const response = await api.post<PagedResponse<Post>>(
    `${API_BASE_URI}/${postId}/like`,
    { withCredentials: true }
  );
  return response.data;
}

async function dislikePost(postId: string): Promise<PagedResponse<Post>> {
  const response = await api.post<PagedResponse<Post>>(
    `${API_BASE_URI}/${postId}/dislike`,
    { withCredentials: true }
  );
  return response.data;
}

export {
  createSubcategoryPost,
  getSubcategoryPosts,
  getCategoryPosts,
  getPostById,
  likePost,
  dislikePost,
};
