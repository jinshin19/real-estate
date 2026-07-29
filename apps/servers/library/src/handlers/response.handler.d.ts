import { HttpStatus } from "@nestjs/common";
export declare const ResponseHandlerService: (params: ResponseHandlerParamsI) => ResponseHandlerI;
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
export interface ResponseHandlerI extends ResponseHandlerParamsI {
}
export {};
//# sourceMappingURL=response.handler.d.ts.map