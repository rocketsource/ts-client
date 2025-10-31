/**
 * Common types and enums used throughout the API
 */

export enum ScanStatus {
  InProgress = 'InProgress',
  Success = 'Success',
  Error = 'Error',
  Cancelled = 'Cancelled',
}

export enum ScanSource {
  Upload = 'Upload',
  API = 'API',
}

export enum IdentifierType {
  UPC = 'UPC',
  EAN = 'EAN',
  GTIN = 'GTIN',
  ISBN = 'ISBN',
  JAN = 'JAN',
  MINSAN = 'MINSAN',
  ASIN = 'ASIN',
}

/**
 * Common API options
 */
export interface ScanOptions {
  [key: string]: any;
}

/**
 * Identifiers associated with a product
 */
export interface Identifiers {
  upc?: string[];
  ean?: string[];
  gtin?: string[];
  isbn?: string[];
  jan?: string[];
  minsan?: string[];
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  per_page: number;
}

/**
 * Generic paginated response wrapper
 */
export interface PaginatedResults<T> {
  data: T[];
  total: number;
  pagination: PaginationParams;
}

/**
 * Standard error response from API
 */
export interface ApiError {
  message: string;
  error?: string;
  details?: Record<string, any>;
}
