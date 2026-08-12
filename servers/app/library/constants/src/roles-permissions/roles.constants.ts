// Constants
import { EXTRACTEDPERMISSIONSC } from './permissions.constants';

export const ROLESC = {
  agent: [
    // Properties
    ...EXTRACTEDPERMISSIONSC.PROPERTIES,
    // Reservations
    ...EXTRACTEDPERMISSIONSC.RESERVATIONS,
  ],
  admin: [
    // Properties
    ...EXTRACTEDPERMISSIONSC.PROPERTIES,
    // Reservations
    ...EXTRACTEDPERMISSIONSC.RESERVATIONS,
  ],
} as const;

export const ROLEC = {
  superadmin: 'superadmin',
  admin: 'admin',
  agent: 'agent',
  client: 'client',
};
