/**
 * Eligibility checking API resource client
 */

import { HttpClient } from '../http-client';

/**
 * Inbound eligibility information for a product
 */
export interface InboundEligibility {
  asin: string;
  eligible: boolean;
  reason?: string;
  restrictions?: string[];
}

/**
 * Client for checking product eligibility
 */
export class EligibilityResource {
  constructor(private httpClient: HttpClient) {}

  /**
   * Check inbound eligibility for ASINs
   *
   * @param asins - Array of ASINs to check
   * @param marketplace - Marketplace to check eligibility for
   * @returns Array of eligibility results
   */
  public async checkInboundEligibility(
    asins: string[],
    marketplace: string
  ): Promise<InboundEligibility[]> {
    return this.httpClient.get('/api/v3/inbound-eligibility', {
      params: {
        asins: asins.join(','),
        marketplace,
      },
    });
  }
}
