import { ROLESC } from "../constants/index.js";

export const ExtractUserRoleU = (params: ExtractUserRoleI): string | null => {
  if (!params.role) return null;
  return params.role;
};

export const SetRolePermissionsU = (role: SetRolePermissionsT) => {
  const rolePermissions = ROLESC[role];
  return rolePermissions;
};

export const ExtractRolePermissionsU = (role: SetRolePermissionsT) => {
  const rolePermissions = ROLESC[role];
  return rolePermissions;
};

interface ExtractUserRoleI {
  role: string;
}

export type SetRolePermissionsT = keyof typeof ROLESC;
