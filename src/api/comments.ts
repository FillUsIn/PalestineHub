import { api } from '@/api/config/axios';
import { CreateCommentDTO, LoginResponseDTO } from '@/types/dtos';
import { Comment } from '@/types/entities';
import { getSession } from 'next-auth/react';

export const getAuthorizationHeader = async () => {
  const session = (await getSession()) as unknown as LoginResponseDTO;
  const bearer = `Bearer ${session.accessToken}`;
  return {
    Authorization: bearer,
  };
};

const API_BASE_URI = '/comments';
async function createComment(
  createCommentDTO: CreateCommentDTO
): Promise<Comment> {
  const response = await api.post<Comment>(
    `${API_BASE_URI}`,
    createCommentDTO,
    {
      withCredentials: true,
      headers: await getAuthorizationHeader(),
    }
  );
  return response.data;
}

async function likeComment(commentId: string): Promise<Comment> {
  const response = await api.post<Comment>(
    `${API_BASE_URI}/${commentId}/like`,
    {},
    {
      withCredentials: true,
      headers: await getAuthorizationHeader(),
    }
  );
  return response.data;
}

async function dislikeComment(commentId: string): Promise<Comment> {
  const response = await api.post<Comment>(
    `${API_BASE_URI}/${commentId}/dislike`,
    {},
    {
      withCredentials: true,
      headers: await getAuthorizationHeader(),
    }
  );
  return response.data;
}

export { createComment, likeComment, dislikeComment };
