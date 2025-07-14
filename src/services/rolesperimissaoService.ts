import axios from "axios";
import { ApiError } from "../types";

// Criação do cliente Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para autenticação
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || "Erro na requisição",
      status: error.response?.status || 500,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  }
);

// Tipo da resposta
export interface UserWithPermissionsAndRoles {
  nome: string;
  email: string;
  role_nome: string;
  permissao: string;
}

// Serviço
export class UserRolesPermissionsService {
  static async getAll(): Promise<UserWithPermissionsAndRoles[]> {
    try {
      const response = await api.get("/User_Permissions_Roles");
      return response.data as UserWithPermissionsAndRoles[];
    } catch (error) {
      console.error("Erro ao buscar usuários com permissões e roles:", error);
      throw error as ApiError;
    }
  }
}

export default UserRolesPermissionsService;
