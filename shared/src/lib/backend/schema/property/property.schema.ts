// Constants
export const PropertyStatusC = [
  "sold",
  "reserved",
  "available",
  "unavailable",
] as const;

// NestJs Imports
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// Utils
import { SYSTEM_ID } from "../../utils/id.utils.js";
// Schema options
import { schemaOptions } from "../schema.options.js";

export const RLPropertiesCN = "rl-properties";

@Schema({
  ...schemaOptions,
  collection: RLPropertiesCN,
})
export class Property {
  @Prop({ type: String, default: () => SYSTEM_ID() })
  public readonly _id!: string;

  @Prop({ type: String, required: true })
  public readonly title!: string;

  @Prop({ type: String, default: null })
  public readonly description?: string | null;

  @Prop({ type: String, required: true })
  public readonly projectId!: string;

  @Prop({ type: String, required: true })
  public readonly houseModelId!: string;

  @Prop({ type: Number, required: true })
  public readonly price!: number;

  @Prop({ type: Number, required: true })
  public readonly reservationFee!: number;

  @Prop({ type: String, enum: PropertyStatusC, required: true })
  public readonly status!: PropertyStatusT;

  @Prop({ type: Boolean, default: false })
  public readonly isFeatured!: boolean;

  @Prop({ type: Boolean, default: false })
  public readonly isPublished!: boolean;

  @Prop({ type: Object, required: true })
  public readonly location!: PropertyLocationI;

  @Prop({ type: Array, required: true })
  public readonly images!: string[];

  @Prop({ type: String, required: true })
  public readonly features!: string;

  @Prop({ type: Object, required: true })
  public readonly specifications!: PropertySpecficationI;

  @Prop({ type: String, required: true })
  public readonly createdBy!: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

export interface PropertyLocationI {
  country: string;
  province?: string | null;
  city?: string | null;
  barangay?: string | null;
  street: string;
  zipCode: string;
  block?: string | null;
  lot?: string | null;
  latitude?: string | null;
  longitude?: string | null;
}

export interface PropertySpecficationI {
  lotArea: string;
  floodArea: string;
  bedrooms: number;
  garageSlot: number;
  floors: number;
}

export type PropertyStatusT = (typeof PropertyStatusC)[number];
