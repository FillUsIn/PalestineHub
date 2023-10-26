import { api } from "@/api/config/axios";
import { CreateUserDTO, LoginDTO } from "@/types/dtos";
import { Post } from "@/types/entities";
const API_BASE_URI = "/users";

async function createUserAccount(createUserDTO: CreateUserDTO): Promise<Post> {
  const response = await api.post<Post>(`${API_BASE_URI}`, createUserDTO, {
    withCredentials: true,
  });
  return response.data;
}

async function login(loginDTO: LoginDTO): Promise<Post> {
  const response = await api.post<Post>(`${API_BASE_URI}/login`, loginDTO, {
    withCredentials: true,
  });
  return response.data;
}

async function logout(): Promise<Post> {
  const response = await api.post<Post>(`${API_BASE_URI}/logout`, {
    withCredentials: true,
  });
  return response.data;
}

export { createUserAccount, login, logout };
