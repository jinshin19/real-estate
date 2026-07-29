import { JwtService } from "@nestjs/jwt";
export declare class JWTService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateAccessToken(data: any): unknown;
    generateRefreshToken(data: any): unknown;
    validateToken(token: string): TokenResponseI;
    decodeToken(token: string): TokenResponseI;
    private generateToken;
}
interface TokenResponseI {
    success: boolean;
    message?: string;
    data?: any;
}
export {};
//# sourceMappingURL=jwt.service.d.ts.map