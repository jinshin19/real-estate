import { Observable } from "rxjs";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JWTService } from "../services/index.js";
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JWTService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=auth.guard.d.ts.map