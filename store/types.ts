// Common types used across all stores
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterState {
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface StoreState extends LoadingState {
  // Common state properties
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Action types
export interface Action<T = any> {
  type: string;
  payload?: T;
  error?: string;
}

// Async action types
export interface AsyncAction<T = any> extends Action<T> {
  status: 'pending' | 'fulfilled' | 'rejected';
}

// Store middleware types
export interface StoreMiddleware {
  name: string;
  before?: (action: Action) => void;
  after?: (action: Action, result: any) => void;
  error?: (action: Action, error: Error) => void;
} 