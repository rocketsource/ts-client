/**
 * Error handling for RocketSource API client
 */

import { AxiosError } from 'axios';

/**
 * Error response from API
 */
export interface ApiErrorResponse {
  message: string;
  error?: string;
  details?: Record<string, any>;
  statusCode?: number;
}

/**
 * Custom error class for API errors
 */
export class RocketSourceError extends Error {
  public readonly statusCode?: number;
  public readonly apiError?: ApiErrorResponse;
  public readonly originalError?: AxiosError;

  constructor(
    message: string,
    statusCode?: number,
    apiError?: ApiErrorResponse,
    originalError?: AxiosError
  ) {
    super(message);
    this.name = 'RocketSourceError';
    this.statusCode = statusCode;
    this.apiError = apiError;
    this.originalError = originalError;
  }
}

/**
 * Error class for authentication failures
 */
export class AuthenticationError extends RocketSourceError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Error class for authorization failures
 */
export class AuthorizationError extends RocketSourceError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Error class for not found errors
 */
export class NotFoundError extends RocketSourceError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Error class for validation errors
 */
export class ValidationError extends RocketSourceError {
  public readonly errors: Record<string, string[]>;

  constructor(
    message: string = 'Validation failed',
    errors: Record<string, string[]> = {}
  ) {
    super(message, 400);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Error class for rate limiting
 */
export class RateLimitError extends RocketSourceError {
  public readonly retryAfter?: number;

  constructor(
    message: string = 'Rate limit exceeded',
    retryAfter?: number
  ) {
    super(message, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Error class for server errors
 */
export class ServerError extends RocketSourceError {
  constructor(message: string = 'Server error') {
    super(message, 500);
    this.name = 'ServerError';
  }
}

/**
 * Parse an axios error and convert it to a RocketSourceError
 */
export function parseAxiosError(error: AxiosError<any>): RocketSourceError {
  const statusCode = error.response?.status;
  const apiError = error.response?.data;
  const message =
    apiError?.message ||
    error.message ||
    'An unknown error occurred';

  switch (statusCode) {
    case 401:
      return new AuthenticationError(message);
    case 403:
      return new AuthorizationError(message);
    case 404:
      return new NotFoundError(message);
    case 400:
      if (apiError?.errors) {
        return new ValidationError(message, apiError.errors);
      }
      return new ValidationError(message);
    case 429:
      const retryAfter = error.response?.headers['retry-after'];
      return new RateLimitError(
        message,
        retryAfter ? parseInt(retryAfter) : undefined
      );
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message);
    default:
      return new RocketSourceError(message, statusCode, apiError, error);
  }
}
