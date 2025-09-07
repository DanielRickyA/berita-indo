import { AxiosError } from "axios";
import useAxios from "..";
import { ApiError, ApiResponse } from "../type";

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

export interface CategoryModelResponse {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
