export type ApiResponse<T = unknown> = {
  message: string;
  data: T | null;
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
