// NestJs Imports
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// Utils
import { SYSTEM_ID } from "../../utils/id.utils.js";
// Schema options
import { schemaOptions } from "../schema.options.js";

export const RLClientsCN = "rl-clients";

@Schema({
  ...schemaOptions,
  collection: RLClientsCN,
})
export class Client {
  @Prop({ type: String, default: () => SYSTEM_ID() })
  public readonly _id!: string;

  @Prop({ type: String, required: true })
  public readonly userId!: string;

  @Prop({ type: String, default: null })
  public readonly agentId?: string | null;

  @Prop({ type: String, default: null })
  public readonly govermentId?: string | null;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
