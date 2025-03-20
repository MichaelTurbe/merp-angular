export interface DataResult<T> {
  success: boolean;
  value: T;
  message?: string;
}
