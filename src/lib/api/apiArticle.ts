import { AxiosError } from "axios";
import useAxios from "..";
import { ApiError, ApiPaginationResponse, ApiResponse, headers } from "../type";

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
): Promise<ApiPaginationResponse<ArticleModelResponse[]>> {
  try {
    const { page = 1, limit = 10, ...filters } = params;

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

export async function getArticleAdmin(
  params: GetArticlesParams = {}
): Promise<ApiPaginationResponse<ArticleModelResponse[]>> {
  try {
    const { page = 1, limit = 10, ...filters } = params;

    const axiosParams: Record<string, unknown> = { page, limit };
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        axiosParams[key] = value;
      }
    });

    const response = await useAxios.get(`/articles`, {
      headers: headers(),
      params: axiosParams,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export async function createArticle(
  data: CreateArticleRequest
): Promise<ApiResponse> {
  try {
    const response = await useAxios.post<ApiResponse>(`/articles`, data, {
      headers: headers(),
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export async function updateArticle(
  data: UpdateArticleRequest
): Promise<ApiResponse> {
  try {
    const response = await useAxios.put<ApiResponse>(
      `/articles/${data.id}`,
      data,
      {
        headers: headers(),
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export async function deleteArticle(id: string): Promise<ApiResponse> {
  try {
    const response = await useAxios.delete<ApiResponse>(`/articles/${id}`, {
      headers: headers(),
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Gagal menghapus admin!",
      data: null,
    } as ApiError;
  }
}

export async function uploadImage(image: File): Promise<UploadImageResponse> {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await useAxios.post<{ imageUrl: string }>(
      "/upload",
      formData,
      {
        headers: {
          ...headers(),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      imageUrl: response.data.imageUrl,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Failed to upload image!",
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

export interface CreateArticleRequest {
  title: string;
  content: string;
  categoryId: string;
}

export type UpdateArticleRequest = Partial<CreateArticleRequest> & {
  id: string;
  imageUrl?: string;
};

export interface UploadImageResponse {
  imageUrl: string;
}
