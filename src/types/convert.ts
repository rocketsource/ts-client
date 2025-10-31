/**
 * Identifier conversion types
 */

import { Marketplace } from './marketplace';
import { Identifiers } from './common';

/**
 * Request to convert identifiers to ASINs
 */
export interface ConvertRequest {
  marketplace: Marketplace;
  ids: string[];
}

/**
 * Response from convert request
 * Maps identifier -> array of ASINs
 */
export type ConvertResponse = Record<string, string[]>;

/**
 * Request to convert ASINs to identifiers
 */
export interface AsinToIdentifiersRequest {
  marketplace: Marketplace;
  asins: string[];
}

/**
 * Response from ASIN to identifiers conversion
 * Maps ASIN -> Identifiers object
 */
export type AsinToIdentifiersResponse = Record<string, Identifiers>;

/**
 * Single identifier conversion result
 */
export interface IdentifierConversionResult {
  input: string;
  asins?: string[];
  error?: string;
}

/**
 * Single ASIN to identifiers result
 */
export interface AsinIdentifierResult {
  asin: string;
  identifiers?: Identifiers;
  error?: string;
}
