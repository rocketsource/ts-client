/**
 * Scan-related types and interfaces
 */

import { ScanStatus, ScanSource, ScanOptions, Identifiers } from './common';
import { Marketplace } from './marketplace';

/**
 * Public scan information returned by the API
 */
export interface PublicScan {
  id: number;
  user_id: number;
  account_id: number;
  marketplace: Marketplace;
  status: ScanStatus;
  source_type: ScanSource;
  source_id: number;
  name: string;
  products: number;
  errors: number;
  speed: number; // items per minute
  lines: number;
  options: ScanOptions;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

/**
 * Single dimension set (package or item dimensions)
 */
export interface DimensionSet {
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  length_unit?: string;
  width_unit?: string;
  height_unit?: string;
  weight_unit?: string;
}

/**
 * Dimension information for products
 */
export interface Dimensions {
  package_dimensions?: DimensionSet;
  item_dimensions?: DimensionSet;
}

/**
 * Amazon fees breakdown (all values in cents)
 */
export interface AmazonFees {
  per_item_fee?: number;
  fba_fees?: number;
  variable_closing_fee?: number;
  referral_fee?: number;
  inbound_placement_fee?: number;
  error?: string;
}

/**
 * Condition type for offers
 */
export enum OfferCondition {
  New = 'New',
  Used = 'Used',
  Collectible = 'Collectible',
  Refurbished = 'Refurbished',
  Club = 'Club',
}

/**
 * Fulfillment channel for offers
 */
export enum FulfillmentChannel {
  Amazon = 'Amazon',
  Merchant = 'Merchant',
}

/**
 * Customer type for offers
 */
export enum OfferCustomerType {
  B2C = 'B2C',
  B2B = 'B2B',
}

/**
 * Quantity discount type
 */
export enum QuantityDiscountType {
  QuantityDiscount = 'QUANTITY_DISCOUNT',
}

/**
 * Points information
 */
export interface Points {
  points_number?: number;
  points_monetary_value?: MoneyType;
}

/**
 * Money type with currency
 */
export interface MoneyType {
  currency_code: string;
  amount: number; // in cents
}

/**
 * Offer count by condition and fulfillment
 */
export interface OfferCount {
  condition?: OfferCondition;
  fulfillment_channel?: FulfillmentChannel;
  offer_count?: number;
}

/**
 * Lowest price info for a product
 */
export interface LowestPriceInfo {
  condition: OfferCondition;
  fulfillment_channel: FulfillmentChannel;
  offer_type?: OfferCustomerType;
  quantity_tier?: number;
  quantity_discount_type?: QuantityDiscountType;
  landed_price: number; // in cents
  listing_price: number; // in cents
  shipping: number; // in cents
  points?: Points;
}

/**
 * Buy box price info for a product
 */
export interface BuyBoxPriceInfo {
  condition: OfferCondition;
  offer_type?: OfferCustomerType;
  quantity_tier?: number;
  quantity_discount_type?: QuantityDiscountType;
  landed_price: number; // in cents
  listing_price: number; // in cents
  shipping: number; // in cents
  points?: Points;
  seller_id?: string;
}

/**
 * Offer information for a product
 */
export interface Offers {
  total_offers_count?: number;
  list_price?: number; // in cents
  buybox_eligible_offers?: OfferCount[];
  number_of_offers?: OfferCount[];
  lowest_prices?: LowestPriceInfo[];
  buy_box_prices?: BuyBoxPriceInfo[];
}

/**
 * Product input (identifier used for lookup and supplier info)
 */
export interface Inputs {
  identifier?: string;
  identifier_override?: string;
  cost?: number; // in cents
  stock?: number;
  map?: number; // in cents
  supplier_title?: string;
  supplier_sku?: string;
  supplier_image?: string;
  supplier_pack_quantity: number;
  discount_per_product?: number; // in basis points
  discount_supplier?: number; // in basis points
  discount_cost?: number; // in cents
  total_cogs?: number; // in cents
  custom_columns?: string[];
  source_link?: string;
}

/**
 * Sales rank information
 */
export interface SalesRank {
  rank: number;
  title?: string;
  raw_title: string;
}

/**
 * Image variant type
 */
export enum ImageVariant {
  Main = 'MAIN',
  Pt01 = 'PT01',
  Pt02 = 'PT02',
  Pt03 = 'PT03',
  Pt04 = 'PT04',
  Pt05 = 'PT05',
  Pt06 = 'PT06',
  Pt07 = 'PT07',
  Pt08 = 'PT08',
  Swch = 'SWCH',
}

/**
 * Single image information
 */
export interface Image {
  height: number;
  width: number;
  link: string;
  variant: ImageVariant;
}

/**
 * Image information by marketplace
 */
export interface ImageByMarketplace {
  marketplace_id: string;
  image: Image[];
}

/**
 * Listing restriction for a product
 */
export interface ListingRestrictionReason {
  message: string;
  reason_code: string;
  links?: Array<{
    resource: string;
    title: string;
    type: string;
    verb: string;
  }>;
}

export interface ListingRestriction {
  condition_type: string;
  marketplace_id: string;
  reasons: ListingRestrictionReason[];
}

/**
 * Small and light eligibility reasons
 */
export interface SmallAndLightEligibilityReasons {
  [key: string]: boolean;
}

/**
 * Inbound eligibility information
 */
export interface InboundEligibility {
  [key: string]: any;
}

/**
 * Return rate for a product
 */
export enum ReturnRate {
  Low = 1,
  High = 2,
}

/**
 * Time-series data with 30/60/90/180 day values
 * -1 indicates data is unavailable
 */
export interface DateValues<T = number> {
  d30: T;
  d60: T;
  d90: T;
  d180: T;
}

/**
 * Historical pricing and performance data
 */
export interface HistoricalResult {
  /** Best seller rank (average sales rank) for different periods */
  bsr: DateValues;
  /** Average price in cents for different periods */
  price: DateValues;
  /** Amazon in-stock percentage (0-100) for different periods */
  amazon_in_stock_rate: DateValues;
  /** Number of sales rank drops for different periods */
  sales_rank_drops: DateValues;
  /** Monthly sold count (None if 0) */
  monthly_sold?: number;
  /** Percentage change in monthly sold over 90 days */
  delta_percent_90_monthly_sold?: number;
  /** Product return rate (Low or High) */
  return_rate?: ReturnRate;
}

/**
 * Financial information for a product
 */
export interface Financials {
  inbound_shipping?: number; // in cents
  prep_cost?: number; // in cents
  fba_storage_fees?: number; // in cents
  net_revenue?: number; // in cents
  profit?: number; // in cents
  margin?: number; // in basis points
  roi?: number; // in basis points
}

/**
 * Full product data returned in scan results
 */
export interface PublicProduct {
  id: number;
  flags?: string[];
  identifiers?: Identifiers;
  errors?: string[];
  inputs: Inputs;
  asin?: string;
  offers: Offers;
  images?: ImageByMarketplace[];
  amazon_title?: string;
  is_top_level_category?: boolean;
  category_raw?: string;
  category?: string;
  rank?: number;
  buybox_price?: number; // in cents
  amazon_pack_quantity: number;
  number_of_variations?: number;
  variations_list?: string[];
  parent_asin?: string;
  parent_asins?: string[];
  sales_ranks?: SalesRank[];
  dimensions: Dimensions;
  amazon_fees: AmazonFees;
  competitive_sellers?: number;
  brand?: string;
  color?: string;
  size_name?: string;
  listing_restrictions?: ListingRestriction[];
  financials: Financials;
  size_tier?: string;
  lowest_price_new_fba?: number; // in cents
  lowest_price_used_fba?: number; // in cents
  lowest_price_new_fbm?: number; // in cents
  lowest_price_used_fbm?: number; // in cents
  buybox_price_new?: number; // in cents
  buybox_price_used?: number; // in cents
  total_offers_count?: number;
  is_brand_blocklisted: boolean;
  new_fba_offers_count?: number;
  new_fbm_offers_count?: number;
  is_adult: boolean;
  is_hazmat: boolean;
  is_meltable: boolean;
  small_and_light_eligible: boolean;
  small_and_light_eligible_reasons: SmallAndLightEligibilityReasons;
  inbound_eligibility?: InboundEligibility;
  note?: string;
  bsr_percentage?: number; // in basis points
  marketplace_id?: number;
  units_per_month?: number;
  sales_per_month?: number; // in cents
  profit_per_month?: number; // in cents
  bullet_points?: string[];
  has_expiration?: boolean;
  has_prop_65?: boolean;
  material?: string;
  historical?: HistoricalResult;
  release_date?: string;
  favorited: boolean;
  tag_ids?: number[];
  listing_match?: boolean;
  part_number?: string;
  model_number?: string;
  marketplace?: number; // numeric marketplace ID (for backwards compatibility)
}

/**
 * Results metadata
 */
export interface ResultsMetadata {
  errors: number;
  lines: number;
  products: number;
  source_id: number;
  source_type_id: number;
  user_id: number;
  scanned_at?: string;
  columns?: ColumnDefinitions;
}

/**
 * Column definitions for results
 */
export interface ColumnDefinitions {
  [key: string]: any;
}

/**
 * Results response with pagination
 */
export interface ResultsResponse<T = PublicProduct> {
  count: number;
  data: T[];
  meta: ResultsMetadata;
  options: ScanOptions;
}

/**
 * Request options for fetching scan results
 */
export interface ResultsRequest {
  filters?: Record<string, any>;
  pagination?: {
    page: number;
    per_page: number;
  };
  sorting?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  table_type?: string;
}

/**
 * Scan creation request (file upload)
 */
export interface ScanUploadRequest {
  marketplace: Marketplace;
  file: File | Buffer;
  options?: ScanOptions;
}

/**
 * Scan creation response
 */
export interface ScanUploadResponse {
  id: number;
  marketplace: Marketplace;
  status: ScanStatus;
  name: string;
  created_at: string;
}
