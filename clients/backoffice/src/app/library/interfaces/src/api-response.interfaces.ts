export interface ApiResponseI<T> {
  data?: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiPaginatedResponseI<T> {
  items: T[];
  metadata: {
    page: number;
    limit: number;
  };
}
