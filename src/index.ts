/**
 * RocketSource TypeScript Client Library
 *
 * A fully typed TypeScript client for the RocketSource API.
 * Provides easy access to all API endpoints with comprehensive type support.
 */

// Main client
export { RocketSourceClient } from './client';

// HTTP client
export { HttpClient } from './http-client';
export type { ClientConfig } from './http-client';

// Errors
export {
  RocketSourceError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  parseAxiosError,
} from './errors';
export type { ApiErrorResponse } from './errors';

// Resources
export {
  ScansResource,
  ConvertResource,
  EligibilityResource,
} from './resources';
export type {
  InboundEligibility,
} from './resources';

// Types
export * from './types';
