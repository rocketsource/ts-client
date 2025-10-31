/**
 * RocketSource API Client
 *
 * Main entry point for the RocketSource API client library.
 * Provides access to all API resources with full TypeScript support.
 *
 * @example
 * ```typescript
 * import { RocketSourceClient } from '@rocketsource/client';
 *
 * const client = new RocketSourceClient({
 *   apiKey: 'your-api-key'
 * });
 *
 * // List scans
 * const scans = await client.scans.list();
 *
 * // Convert identifiers to ASINs
 * const result = await client.convert.toAsin({
 *   marketplace: 'UnitedStates',
 *   ids: ['123456789012']
 * });
 *
 * // Get scan results
 * const results = await client.scans.getResults(123);
 * ```
 */

import { HttpClient, ClientConfig } from './http-client';
import {
  ScansResource,
  ConvertResource,
  EligibilityResource,
} from './resources';

/**
 * Main RocketSource API client
 *
 * Provides access to all API resources through typed methods.
 * Handles authentication, error handling, and request/response serialization.
 */
export class RocketSourceClient {
  private httpClient: HttpClient;

  // API resources
  public scans: ScansResource;
  public convert: ConvertResource;
  public eligibility: EligibilityResource;

  constructor(config: ClientConfig = {}) {
    this.httpClient = new HttpClient(config);

    // Initialize all resources
    this.scans = new ScansResource(this.httpClient);
    this.convert = new ConvertResource(this.httpClient);
    this.eligibility = new EligibilityResource(this.httpClient);
  }

  /**
   * Set or update the API key for authentication
   */
  public setApiKey(apiKey: string): void {
    this.httpClient.setApiKey(apiKey);
  }

  /**
   * Get the current API key
   */
  public getApiKey(): string | undefined {
    return this.httpClient.getApiKey();
  }
}
