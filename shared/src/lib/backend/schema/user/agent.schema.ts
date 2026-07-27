// NestJs Imports
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// Utils
import { SYSTEM_ID } from "../../utils/id.utils.js";
// Schema options
import { schemaOptions } from "../schema.options.js";

export const RLAgentsCN = "rl-agents";

@Schema({
  ...schemaOptions,
  collection: RLAgentsCN,
})
export class Agent {
  @Prop({ type: String, default: () => SYSTEM_ID() })
  public readonly _id!: string;

  @Prop({ type: String, required: true })
  public readonly userId!: string;

  @Prop({ type: String, default: null })
  public readonly managerId?: string | null;

  @Prop({ type: String, default: null })
  public readonly branchId?: string | null;

  @Prop({ type: String, required: true })
  public readonly hireDate!: string | null;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
