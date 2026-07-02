// Constants
export const AuditLogActionsC = ["create", "update", "delete"] as const;

// NestJs Imports
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
// Utils
import { SYSTEM_ID } from "../../utils/id.utils.js";
// Schema options
import { schemaOptions } from "../schema.options.js";

export const RLAuditLogsCN = "rl-audit-logs";

@Schema({
  collection: RLAuditLogsCN,
  ...schemaOptions,
})
export class AuditLogs {
  @Prop({ type: String, default: () => SYSTEM_ID() })
  public readonly _id!: string;

  @Prop({ type: String, required: true })
  public userId!: string;

  @Prop({ type: String, required: true })
  public collectionId!: string;

  @Prop({ type: String, required: true })
  public collectionName!: string;

  @Prop({ type: String, enum: AuditLogActionsC, required: true })
  public action!: AuditLogActionsT;

  @Prop({ type: String, required: true })
  public field!: string;

  @Prop({ type: String, default: null })
  public oldValue?: string | null;

  @Prop({ type: String, default: null })
  public newValue?: string | null;

  @Prop({ type: String, required: true })
  public userAgent!: string;
}

export const AuditLogsSchema = SchemaFactory.createForClass(AuditLogs);

export type AuditLogActionsT = (typeof AuditLogActionsC)[number];
