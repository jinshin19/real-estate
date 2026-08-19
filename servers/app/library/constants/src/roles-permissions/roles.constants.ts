// Constants
import { EXTRACTEDPERMISSIONSC } from './permissions.constants';

export const ROLESC = {
  agent: [
    // Uploads
    ...EXTRACTEDPERMISSIONSC.UPLOADS,
    // Properties
    ...EXTRACTEDPERMISSIONSC.PROPERTIES,
    // Reservations
    ...EXTRACTEDPERMISSIONSC.RESERVATIONS,
  ],
  admin: [
    // Uploads
    ...EXTRACTEDPERMISSIONSC.UPLOADS,
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
