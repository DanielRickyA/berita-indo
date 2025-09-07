import { AxiosError } from "axios";
import useAxios from "..";
import { ApiError, ApiResponse, headers } from "../type";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const response = await useAxios.post("/auth/Login", { username, password });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Terjadi kesalahan!",
      data: null,
    } as ApiError;
  }
}

export async function register({
  username,
  password,
  role,
}: {
  username: string;
  password: string;
  role: string;
}): Promise<ApiResponse> {
  try {
    const response = await useAxios.post("/auth/Register", {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw {
      message: axiosError.response?.data?.message || "Gagal registrasi!",
      data: null,
    } as ApiError;
  }
}

export async function getProfil(): Promise<ProfilResponse> {
  try {
    const response = await useAxios.get(`/auth/profile`, {
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

export type LoginResponse = {
  token: string;
  role: string;
};

export type ProfilResponse = {
  id: string;
  username: string;
  role: "User" | "Admin";
  createdAt: string;
  updatedAt: string;
};
