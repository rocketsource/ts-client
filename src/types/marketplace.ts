/**
 * Supported Amazon marketplaces
 */
export enum Marketplace {
  US = 'US',
  CA = 'CA',
  MX = 'MX',
  UK = 'UK',
  DE = 'DE',
  FR = 'FR',
  IT = 'IT',
  ES = 'ES',
  NL = 'NL',
  SE = 'SE',
  PL = 'PL',
  EG = 'EG',
  TR = 'TR',
  IN = 'IN',
  JP = 'JP',
  AU = 'AU',
  SG = 'SG',
}

/**
 * Marketplace ID mapping (numeric codes)
 */
export const MARKETPLACE_IDS: Record<Marketplace, number> = {
  [Marketplace.US]: 1,
  [Marketplace.CA]: 2,
  [Marketplace.MX]: 3,
  [Marketplace.UK]: 4,
  [Marketplace.DE]: 5,
  [Marketplace.FR]: 6,
  [Marketplace.IT]: 7,
  [Marketplace.ES]: 8,
  [Marketplace.NL]: 9,
  [Marketplace.SE]: 10,
  [Marketplace.PL]: 11,
  [Marketplace.EG]: 12,
  [Marketplace.TR]: 13,
  [Marketplace.IN]: 14,
  [Marketplace.JP]: 15,
  [Marketplace.AU]: 16,
  [Marketplace.SG]: 17,
};
