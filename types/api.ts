/**
 * API Response Types
 *
 * Type definitions for API responses and error handling.
 */

import type { Team } from "./index";

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
  error?: ApiError;
}

/**
 * API metadata
 */
export interface ApiMeta {
  /**
   * Total number of items (for paginated responses)
   */
  total?: number;

  /**
   * Current page number
   */
  page?: number;

  /**
   * Items per page
   */
  perPage?: number;

  /**
   * Timestamp of the response
   */
  timestamp?: string;
}

/**
 * API error information
 */
export interface ApiError {
  /**
   * Error message
   */
  message: string;

  /**
   * Error code
   */
  code?: string;

  /**
   * HTTP status code
   */
  status?: number;

  /**
   * Additional error details
   */
  details?: unknown;
}

/**
 * BallDontLie API response format
 */
export interface BallDontLieResponse<T> {
  data: T;
  meta?: {
    next_cursor?: number;
    per_page?: number;
  };
}

/**
 * Teams API responses
 */
export interface TeamsResponse extends ApiResponse<Team[]> {}

export interface TeamResponse extends ApiResponse<Team> {}
