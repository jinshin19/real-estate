// NestJs Imports
import { SchemaOptions } from "@nestjs/mongoose";

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  versionKey: false,
  suppressReservedKeysWarning: true,
};
