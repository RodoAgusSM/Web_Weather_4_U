import APIResponse from './ApiResponse';

interface ApiError {
  (error: any, response?: APIResponse): void;
}

export default ApiError;
