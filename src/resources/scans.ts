/**
 * Scans API resource client
 */

import { HttpClient } from '../http-client';
import {
  PublicScan,
  PublicProduct,
  ResultsResponse,
  ResultsRequest,
  ScanUploadRequest,
  ScanUploadResponse,
  PaginatedResults,
} from '../types';

/**
 * Client for managing scans via the API
 */
export class ScansResource {
  constructor(private httpClient: HttpClient) {}

  /**
   * List all scans with pagination
   */
  public async list(
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResults<PublicScan>> {
    return this.httpClient.get('/api/v3/scans', {
      params: {
        page,
        perPage: Math.min(perPage, 100), // Max 100 per page
      },
    });
  }

  /**
   * Get a specific scan by ID
   */
  public async get(scanId: number): Promise<PublicScan> {
    return this.httpClient.get(`/api/v3/scans/${scanId}`);
  }

  /**
   * Get scan results with optional filtering and pagination
   */
  public async getResults(
    scanId: number,
    request?: ResultsRequest,
    tableType?: string
  ): Promise<ResultsResponse<PublicProduct>> {
    const config: any = {};
    if (tableType) {
      config.params = { table_type: tableType };
    }
    return this.httpClient.post(
      `/api/v3/scans/${scanId}`,
      request || {},
      config
    );
  }

  /**
   * Upload a scan file
   */
  public async upload(request: ScanUploadRequest): Promise<ScanUploadResponse> {
    const formData = new FormData();
    formData.append('marketplace', request.marketplace);

    // Handle both File and Buffer
    if (request.file instanceof File) {
      formData.append('file', request.file);
    } else {
      // Convert Buffer to Blob
      const blob = new Blob([request.file], { type: 'text/csv' });
      formData.append('file', blob, 'upload.csv');
    }

    if (request.options) {
      formData.append('options', JSON.stringify(request.options));
    }

    return this.httpClient.post('/api/v3/scans', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Cancel a scan
   */
  public async cancel(scanId: number): Promise<PublicScan> {
    return this.httpClient.post(`/api/v3/scans/${scanId}/cancel`);
  }

  /**
   * Rerun a scan
   */
  public async rerun(scanId: number): Promise<PublicScan> {
    return this.httpClient.post(`/api/v3/scans/${scanId}/rerun`);
  }

  /**
   * Export scan results as CSV
   */
  public async exportCsv(
    scanId: number,
    request?: ResultsRequest
  ): Promise<Blob> {
    return this.httpClient.post(
      `/api/v3/scans/${scanId}/csv`,
      request || {},
      {
        responseType: 'blob',
      }
    );
  }

  /**
   * Export scan results as Excel
   */
  public async exportXlsx(
    scanId: number,
    request?: ResultsRequest
  ): Promise<Blob> {
    return this.httpClient.post(
      `/api/v3/scans/${scanId}/xlsx`,
      request || {},
      {
        responseType: 'blob',
      }
    );
  }

  /**
   * Export scan results to Google Sheets
   */
  public async exportGoogleSheets(
    scanId: number,
    request?: ResultsRequest
  ): Promise<{ url: string }> {
    return this.httpClient.post(
      `/api/v3/scans/${scanId}/gsheet`,
      request || {}
    );
  }

  /**
   * Recalculate fees for scan
   */
  public async recalculateFees(
    scanId: number,
    selection?: Record<string, any>
  ): Promise<PublicScan> {
    return this.httpClient.post(
      `/api/v3/scans/${scanId}/fees-recalculate`,
      selection || {}
    );
  }
}
