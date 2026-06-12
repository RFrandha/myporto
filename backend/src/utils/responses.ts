import { ApiResponse } from '../types';

export function successResponse<T>(message: string, data: T): ApiResponse<T> {
  return { code: 'SUCCESS', message, data };
}

export function validationErrorResponse(message: string): ApiResponse {
  return { code: 'VALIDATION_ERROR', message, data: null };
}

export function internalErrorResponse(message: string): ApiResponse {
  return { code: 'INTERNAL_ERROR', message, data: null };
}

export function notFoundResponse(message: string): ApiResponse {
  return { code: 'NOT_FOUND', message, data: null };
}
