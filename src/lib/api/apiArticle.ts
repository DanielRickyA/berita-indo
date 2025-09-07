import { AxiosError } from "axios";
import useAxios from "..";
import { ApiError, ApiResponse } from "../type";

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  articleId?: string;
  userId?: string;
  title?: string;
  category?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getArticles(
  params: GetArticlesParams = {}
): Promise<ApiResponse<ArticleModelResponse[]>> {
  try {
    const { page = 1, limit = 10, ...filters } = params;

    // Hanya kirim parameter yang punya nilai
    const axiosParams: Record<string, unknown> = { page, limit };
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        axiosParams[key] = value;
      }
    });

    const response = await useAxios.get("/articles", { params: axiosParams });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export async function getArticle(id: string): Promise<ArticleModelResponse> {
  try {
    const response = await useAxios.get(`/articles/${id}`);
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
  createdAt: string; 
  updatedAt: string; 
}

export interface User {
  id: string;
  username: string;
  role: "User" | "Admin";
}

export interface ArticleModelResponse {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user: User;
}
