/**
 * HTTP client for RocketSource API
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { parseAxiosError, RocketSourceError } from './errors';

/**
 * Configuration for the RocketSource API client
 */
export interface ClientConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP client for making requests to RocketSource API
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;
  private apiKey?: string;

  constructor(config: ClientConfig = {}) {
    const {
      baseURL = 'https://app.rocketsource.io',
      apiKey,
      timeout = 30000,
      headers = {},
    } = config;

    this.apiKey = apiKey;

    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    // Add request interceptor for authentication
    this.axiosInstance.interceptors.request.use((requestConfig) => {
      if (this.apiKey) {
        requestConfig.headers.Authorization = `Bearer ${this.apiKey}`;
      }
      return requestConfig;
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw parseAxiosError(error);
      }
    );
  }

  /**
   * Set or update the API key for authentication
   */
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Get the current API key
   */
  public getApiKey(): string | undefined {
    return this.apiKey;
  }

  /**
   * Make a GET request
   */
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      if (error instanceof RocketSourceError) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Make a POST request
   */
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof RocketSourceError) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Make a PUT request
   */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof RocketSourceError) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Make a PATCH request
   */
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof RocketSourceError) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Make a DELETE request
   */
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      if (error instanceof RocketSourceError) {
        throw error;
      }
      throw error;
    }
  }

  /**
   * Get the underlying axios instance for advanced use cases
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
