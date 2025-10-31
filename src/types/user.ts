/**
 * User-related types
 */

/**
 * User profile information
 */
export interface User {
  id: number;
  account_id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_subscription_status?: string | null;
  subscription_plan?: string | null;
  preferred_units: 'inches and pounds' | 'cm and kg';
}

/**
 * User account information
 */
export interface Account {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
