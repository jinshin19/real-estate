// Constants
import { EXTRACTEDPERMISSIONSC } from "./permissions.constants.js";

export const ROLESC = {
  agent: [
    // Properties
    ...EXTRACTEDPERMISSIONSC.PROPERTIES,
  ],
  admin: [
    // Properties
    ...EXTRACTEDPERMISSIONSC.PROPERTIES,
  ],
} as const;

export const ROLEC = {
  superadmin: "superadmin",
  admin: "admin",
  agent: "agent",
  client: "client",
};
