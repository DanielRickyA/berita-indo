import { AxiosError } from "axios";
import useAxios from "..";
import {
  ApiError,
  ApiPaginationTableResponse,
  ApiResponse,
  headers,
} from "../type";

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getCategories(): Promise<
  ApiResponse<CategoryModelResponse[]>
> {
  try {
    const response = await useAxios.get(`/categories`, {});
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export async function getCategoriesAdmin(
  params: GetCategoriesParams = {}
): Promise<ApiPaginationTableResponse<CategoryModelResponse[]>> {
  try {
    const response = await useAxios.get(`/categories`, {
      headers: headers(),
      params: { search: params.search, page: params.page, limit: params.limit },
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

export async function createCategory(
  data: CreateCategoryRequest
): Promise<ApiResponse> {
  try {
    const response = await useAxios.post<ApiResponse>(`/categories`, data, {
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

export async function updateCategory(
  data: UpdateCategoryRequest
): Promise<ApiResponse> {
  try {
    const response = await useAxios.put<ApiResponse>(
      `/categories/${data.id}`,
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

export async function deleteCategory(id: string): Promise<ApiResponse> {
  try {
    const response = await useAxios.delete<ApiResponse>(`/categories/${id}`, {
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

export interface CategoryModelResponse {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export type UpdateCategoryRequest = Partial<CreateCategoryRequest> & {
  id: string;
};
