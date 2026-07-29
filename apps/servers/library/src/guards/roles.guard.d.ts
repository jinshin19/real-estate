import { Observable } from "rxjs";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JWTService } from "../services/index.js";
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly jwtService;
    constructor(reflector: Reflector, jwtService: JWTService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=roles.guard.d.ts.map