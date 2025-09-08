export type ApiResponse<T = unknown> = {
  message: string;
  data: T | null;
};

export type ApiPaginationResponse<T = unknown> = {
  message: string;
  data: T | null;
  total: number;
  page: number;
  limit: number;
};

export type ApiPaginationTableResponse<T = unknown> = {
  message: string;
  data: T | null;
  totalData: number;
  currentPage: number;
  totalPages: number;
};

export type ApiError = {
  message: string;
  data: null;
};

export function headers() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}
