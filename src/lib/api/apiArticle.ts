import { AxiosError } from "axios";
import useAxios from "..";
import { ApiError, ApiResponse } from "../type";

export async function getJurusan(): Promise<ApiResponse<Article[]>> {
  try {
    const response = await useAxios.get(`/articles`, {});
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string; // atau Date kalau nanti parse
  updatedAt: string; // atau Date
}

export interface User {
  id: string;
  username: string;
  role: "User" | "Admin"; // jika hanya 2 role
}

export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  createdAt: string; // bisa juga Date
  updatedAt: string; // bisa juga Date
  category: Category;
  user: User;
}
