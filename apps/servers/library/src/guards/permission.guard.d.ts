import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JWTService } from "../services/index.js";
export declare class PermissionGuard implements CanActivate {
    private readonly reflector;
    private readonly jwtService;
    constructor(reflector: Reflector, jwtService: JWTService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=permission.guard.d.ts.map