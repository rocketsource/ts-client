/**
 * Identifier conversion API resource client
 */

import { HttpClient } from '../http-client';
import {
  ConvertRequest,
  ConvertResponse,
  AsinToIdentifiersRequest,
  AsinToIdentifiersResponse,
} from '../types';

/**
 * Client for converting between identifiers and ASINs
 */
export class ConvertResource {
  constructor(private httpClient: HttpClient) {}

  /**
   * Convert identifiers (UPC, EAN, ISBN, etc.) to ASINs
   *
   * @param request - Conversion request with marketplace and identifiers
   * @returns Map of identifier -> array of ASINs
   */
  public async toAsin(request: ConvertRequest): Promise<ConvertResponse> {
    return this.httpClient.post('/api/v3/convert', request);
  }

  /**
   * Convert ASINs to identifiers
   *
   * @param request - Conversion request with marketplace and ASINs
   * @returns Map of ASIN -> Identifiers object
   */
  public async fromAsin(
    request: AsinToIdentifiersRequest
  ): Promise<AsinToIdentifiersResponse> {
    return this.httpClient.post('/api/v3/asin-convert', request);
  }

  /**
   * Bulk convert multiple identifiers to ASINs
   *
   * @param marketplace - Target marketplace
   * @param ids - Array of identifiers to convert
   * @returns Map of identifier -> array of ASINs
   */
  public async convertIds(
    marketplace: string,
    ids: string[]
  ): Promise<ConvertResponse> {
    return this.toAsin({
      marketplace: marketplace as any,
      ids,
    });
  }

  /**
   * Bulk convert multiple ASINs to identifiers
   *
   * @param marketplace - Target marketplace
   * @param asins - Array of ASINs to convert
   * @returns Map of ASIN -> Identifiers object
   */
  public async convertAsins(
    marketplace: string,
    asins: string[]
  ): Promise<AsinToIdentifiersResponse> {
    return this.fromAsin({
      marketplace: marketplace as any,
      asins,
    });
  }

  /**
   * Convert UPCs to ASINs
   *
   * @param marketplace - Target marketplace
   * @param upcs - Array of UPC codes to convert
   * @returns Map of UPC -> array of ASINs
   */
  public async convertUpcs(
    marketplace: string,
    upcs: string[]
  ): Promise<ConvertResponse> {
    return this.convertIds(marketplace, upcs);
  }

  /**
   * Convert EANs to ASINs
   *
   * @param marketplace - Target marketplace
   * @param eans - Array of EAN codes to convert
   * @returns Map of EAN -> array of ASINs
   */
  public async convertEans(
    marketplace: string,
    eans: string[]
  ): Promise<ConvertResponse> {
    return this.convertIds(marketplace, eans);
  }

  /**
   * Convert ISBNs to ASINs
   *
   * @param marketplace - Target marketplace
   * @param isbns - Array of ISBN codes to convert
   * @returns Map of ISBN -> array of ASINs
   */
  public async convertIsbns(
    marketplace: string,
    isbns: string[]
  ): Promise<ConvertResponse> {
    return this.convertIds(marketplace, isbns);
  }
}
