import { ROLESC } from "../constants/index.js";
export declare const ExtractUserRoleU: (params: ExtractUserRoleI) => string | null;
export declare const SetRolePermissionsU: (role: SetRolePermissionsT) => readonly string[];
export declare const ExtractRolePermissionsU: (role: SetRolePermissionsT) => readonly string[];
interface ExtractUserRoleI {
    role: string;
}
export type SetRolePermissionsT = keyof typeof ROLESC;
export {};
//# sourceMappingURL=roles-permissions.utils.d.ts.map