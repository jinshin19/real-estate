import { HttpStatus } from "@nestjs/common";

export const ResponseHandlerService = (
  params: ResponseHandlerParamsI,
): ResponseHandlerI => {
  return {
    status: params.status,
    success: params.success,
    message: params.message,
    data: params.data,
    errorDetails: params.errorDetails,
  };
};

interface ResponseHandlerParamsI {
  status: HttpStatus;
  success: boolean;
  message?: string;
  data?: any;
  errorDetails?: {
    name: string;
    error: any;
  };
}

export interface ResponseHandlerI extends ResponseHandlerParamsI {}
