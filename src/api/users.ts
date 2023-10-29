import { api } from '@/api/config/axios';
import {
  CreateUserDTO,
  CreateUserResponseDTO,
  LoginDTO,
  LoginResponseDTO,
} from '@/types/dtos';

const API_BASE_URI = '/users';

async function createUserAccount(
  createUserDTO: CreateUserDTO
): Promise<CreateUserResponseDTO> {
  const response = await api.post<CreateUserResponseDTO>(
    `${API_BASE_URI}`,
    createUserDTO,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

async function login(loginDTO: LoginDTO): Promise<LoginResponseDTO> {
  const response = await api.post<LoginResponseDTO>(
    `${API_BASE_URI}/login`,
    loginDTO,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

async function logout(): Promise<unknown> {
  const response = await api.post<unknown>(`${API_BASE_URI}/logout`, {
    withCredentials: true,
  });
  return response.data;
}

export { createUserAccount, login, logout };
