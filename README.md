# RocketSource TypeScript Client

A fully typed TypeScript client library for the [RocketSource API](https://rocketsource.io).

[Visit RocketSource](https://rocketsource.io) to get started with your Amazon seller analysis.

## Features

- **Full TypeScript support** - Comprehensive type definitions for all API endpoints
- **Bearer token authentication** - Easy API key management
- **Error handling** - Custom error classes for different error scenarios
- **Resource-based API** - Clean, intuitive API organized by resource (scans, convert, etc.)
- **Promise-based** - Modern async/await support
- **Axios-powered** - Reliable HTTP client underneath

## Installation

```bash
npm install @rocketsource/ts-client
# or
yarn add @rocketsource/ts-client
# or
pnpm install @rocketsource/ts-client
```

## Quick Start

```typescript
import { RocketSourceClient } from '@rocketsource/ts-client';

const client = new RocketSourceClient({
  apiKey: 'your-api-key'
  // baseURL defaults to https://app.rocketsource.io
});

// List scans
const scans = await client.scans.list();
console.log(scans.data);

// Convert identifiers to ASINs
const result = await client.convert.toAsin({
  marketplace: 'UnitedStates',
  ids: ['123456789012']
});
console.log(result);
```

## Usage Examples

### Scans

```typescript
// List scans with pagination
const scans = await client.scans.list(1, 20);

// Get a specific scan
const scan = await client.scans.get(123);

// Get scan results
const results = await client.scans.getResults(123, {
  pagination: { page: 1, per_page: 50 }
});

// Upload a scan file
const uploadedScan = await client.scans.upload({
  marketplace: Marketplace.US,
  file: fileObject
});

// Export results
const csvBlob = await client.scans.exportCsv(123);
const xlsxBlob = await client.scans.exportXlsx(123);
const googleSheets = await client.scans.exportGoogleSheets(123);

// Cancel or rerun a scan
await client.scans.cancel(123);
await client.scans.rerun(123);
```

### Identifier Conversion

```typescript
// Convert identifiers (UPC, EAN, ISBN, etc.) to ASINs
const asinMap = await client.convert.toAsin({
  marketplace: Marketplace.US,
  ids: ['123456789012', '978-1-234-56789-0']
});
// Result: { "123456789012": ["B001ASIN1"], "978-1-234-56789-0": ["B001ASIN2"] }

// Convert ASINs to identifiers
const identifierMap = await client.convert.fromAsin({
  marketplace: Marketplace.US,
  asins: ['B001ASIN1', 'B001ASIN2']
});
// Result: { "B001ASIN1": { upc: [...], ean: [...], ... }, ... }

// Convenience methods
const asins = await client.convert.convertIds(Marketplace.US, ['123456789012']);
const upcs = await client.convert.convertUpcs(Marketplace.US, ['123456789012']);
const eans = await client.convert.convertEans(Marketplace.US, ['5901234123457']);
const isbns = await client.convert.convertIsbns(Marketplace.US, ['978-0-135-95705-0']);
const identifiers = await client.convert.convertAsins(Marketplace.US, ['B001ASIN1']);
```

### Eligibility Checking

```typescript
// Check inbound eligibility for ASINs
const eligibility = await client.eligibility.checkInboundEligibility(
  ['B001ASIN1', 'B001ASIN2'],
  Marketplace.US
);
```

## Type Definitions

All types are exported and can be imported directly:

```typescript
import {
  PublicScan,
  PublicProduct,
  ResultsResponse,
  ConvertRequest,
  ConvertResponse,
  Marketplace,
  ScanStatus,
} from '@rocketsource/ts-client';

const scan: PublicScan = ...;
const result: ResultsResponse<PublicProduct> = ...;
```

## Error Handling

The client includes specialized error classes:

```typescript
import {
  RocketSourceError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
} from '@rocketsource/ts-client';

try {
  const results = await client.scans.getResults(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Scan not found');
  } else if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter}s`);
  } else if (error instanceof ValidationError) {
    console.log('Validation errors:', error.errors);
  }
}
```

## Configuration

```typescript
const client = new RocketSourceClient({
  // API key for authentication (Bearer token)
  apiKey: 'your-api-key',

  // Base URL for the API (defaults to https://app.rocketsource.io)
  baseURL: 'https://app.rocketsource.io',

  // Request timeout in milliseconds (defaults to 30000)
  timeout: 30000,

  // Additional HTTP headers
  headers: {
    'X-Custom-Header': 'value'
  }
});

// Update API key later
client.setApiKey('new-api-key');
```

## Supported Marketplaces

- `US` - United States
- `CA` - Canada
- `MX` - Mexico
- `UK` - United Kingdom
- `DE` - Germany
- `FR` - France
- `IT` - Italy
- `ES` - Spain
- `NL` - Netherlands
- `SE` - Sweden
- `PL` - Poland
- `EG` - Egypt
- `TR` - Turkey
- `IN` - India
- `JP` - Japan
- `AU` - Australia
- `SG` - Singapore

## API Documentation

For detailed API documentation, visit [RocketSource API Documentation](https://rocketsource.io/docs).

## License

MIT
