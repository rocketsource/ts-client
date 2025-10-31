/**
 * Basic example usage of the RocketSource TypeScript client
 */

import {
  RocketSourceClient,
  Marketplace,
  NotFoundError,
  AuthenticationError,
} from '../src';

async function main() {
  // Initialize client with API key
  const client = new RocketSourceClient({
    apiKey: process.env.ROCKETSOURCE_API_KEY,
    // baseURL defaults to https://app.rocketsource.io
  });

  try {
    // List scans
    console.log('\nListing scans...');
    const scans = await client.scans.list(1, 10);
    console.log(`Found ${scans.total} scans`);
    console.log('First 10 scans:', scans.data);

    // Convert identifiers to ASINs
    console.log('\nConverting identifiers to ASINs...');
    const convertResult = await client.convert.convertIds(
      Marketplace.US,
      ['123456789012', '978-0-135-95705-0']
    );
    console.log('Conversion result:', convertResult);

    // Get a specific scan (this might fail if scan doesn't exist)
    console.log('\nGetting specific scan...');
    try {
      const scan = await client.scans.get(1);
      console.log('Scan details:', scan);

      // Get scan results
      const results = await client.scans.getResults(1, {
        pagination: { page: 1, per_page: 10 },
      });
      console.log(`Scan has ${results.count} products`);
      console.log('First 10 products:', results.data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        console.log('Scan not found. This is expected if no scans exist.');
      } else {
        throw error;
      }
    }

    // Check eligibility
    console.log('\nChecking inbound eligibility...');
    const eligibility = await client.eligibility.checkInboundEligibility(
      ['B001ASIN1', 'B001ASIN2'],
      Marketplace.US
    );
    console.log('Eligibility results:', eligibility);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed. Check your API key.');
    } else {
      console.error('Error:', error);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
