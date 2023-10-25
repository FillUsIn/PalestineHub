import { api } from "@/api/config/axios";
import { Topic } from "@/types/dtos";

async function getTopics(): Promise<Topic[]> {
  const response = await api.get<Topic[]>(`/topics`);
  return response.data;
}

export { getTopics };
