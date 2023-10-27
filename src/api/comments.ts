import { api } from '@/api/config/axios';
import { CreateCommentDTO } from '@/types/dtos';
import { Comment } from '@/types/entities';

const API_BASE_URI = '/comments';
async function createComment(
  createCommentDTO: CreateCommentDTO
): Promise<Comment> {
  const response = await api.post<Comment>(
    `${API_BASE_URI}`,
    createCommentDTO,
    { withCredentials: true }
  );
  return response.data;
}

async function likeComment(commentId: string): Promise<Comment> {
  const response = await api.post<Comment>(
    `${API_BASE_URI}/${commentId}/like`,
    { withCredentials: true }
  );
  return response.data;
}

async function dislikeComment(commentId: string): Promise<Comment> {
  const response = await api.post<Comment>(
    `${API_BASE_URI}/${commentId}/dislike`,
    { withCredentials: true }
  );
  return response.data;
}

export { createComment, likeComment, dislikeComment };
