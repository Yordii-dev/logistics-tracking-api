import { ApiResponse } from './response.interface';

export class ApiResponseFormatter {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }

  static error(message: string, errors?: string[]): ApiResponse {
    return {
      success: false,
      message,
      errors,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }
}
