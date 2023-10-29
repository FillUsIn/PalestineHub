import { api } from '@/api/config/axios';
import { CreatePostDTO, PagedResponse, PostSummaryDTO } from '@/types/dtos';
import { Post } from '@/types/entities';
import { getAuthorizationHeader } from './comments';

const API_BASE_URI = '/posts';
async function createSubcategoryPost(
  subCategoryName: string,
  createPostDTO: CreatePostDTO
): Promise<Post> {
  const response = await api.post<Post>(
    `${API_BASE_URI}/subcategory/${subCategoryName}`,
    createPostDTO,
    { withCredentials: true, headers: await getAuthorizationHeader() }
  );
  return response.data;
}

async function getAllPosts(
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<PostSummaryDTO>> {
  const response = await api.get<PagedResponse<PostSummaryDTO>>(
    `${API_BASE_URI}`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
}

async function getCategoryPosts(
  categoryName: string,
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<PostSummaryDTO>> {
  const response = await api.get<PagedResponse<PostSummaryDTO>>(
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

async function getSubcategoryPosts(
  subCategoryName: string,
  page: number = 0,
  size: number = 10
): Promise<PagedResponse<PostSummaryDTO>> {
  const response = await api.get<PagedResponse<PostSummaryDTO>>(
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

async function getPostById(postId: string): Promise<Post> {
  const response = await api.get<Post>(`${API_BASE_URI}/${postId}`);
  return response.data;
}

async function likePost(postId: string): Promise<PagedResponse<Post>> {
  const response = await api.post<PagedResponse<Post>>(
    `${API_BASE_URI}/${postId}/like`,
    {},
    { withCredentials: true, headers: await getAuthorizationHeader() }
  );
  return response.data;
}

async function dislikePost(postId: string): Promise<PagedResponse<Post>> {
  const response = await api.post<PagedResponse<Post>>(
    `${API_BASE_URI}/${postId}/dislike`,
    {},
    { withCredentials: true, headers: await getAuthorizationHeader() }
  );
  return response.data;
}

export {
  createSubcategoryPost,
  getAllPosts,
  getSubcategoryPosts,
  getCategoryPosts,
  getPostById,
  likePost,
  dislikePost,
};
