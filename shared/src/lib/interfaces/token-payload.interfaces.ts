export interface TokenPayloadI {
  firstName: string;
  lastName: string;
  contactNumber: string;
  birthDate: string;
  gender: string;
  email: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}
