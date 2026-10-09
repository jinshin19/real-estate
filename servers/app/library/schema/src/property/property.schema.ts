// Constants
export const PropertyStatusC = [
  'sold',
  'reserved',
  'available',
  'unavailable',
] as const;

// NestJs Imports
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Utils
import { SYSTEM_ID } from '../../../utils';
// Schema options
import { schemaOptions } from '../../src/schema.options';

export const RLPropertiesCN = 'rl-properties';

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

  @Prop({ type: String, default: null })
  public readonly projectId!: string;

  @Prop({ type: String, default: null })
  public readonly houseModelId!: string;

  @Prop({ type: Number, default: null })
  public readonly price!: number;

  @Prop({ type: Number, default: null })
  public readonly reservationFee!: number;

  @Prop({ type: String, enum: PropertyStatusC, default: null })
  public readonly status!: PropertyStatusT;

  @Prop({ type: Boolean, default: false })
  public readonly isFeatured!: boolean;

  @Prop({ type: Boolean, default: false })
  public readonly isPublished!: boolean;

  @Prop({ type: Object, default: null })
  public readonly location!: PropertyLocationI;

  @Prop({ type: Array, default: null })
  public readonly images!: PropertyImagesI[];

  @Prop({ type: String, default: null })
  public readonly features!: string;

  @Prop({ type: Object, default: null })
  public readonly specifications!: PropertySpecficationI;

  @Prop({ type: String, required: true })
  public readonly createdBy!: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

export interface PropertyImagesI {
  id: string;
  name: string;
  url: string;
}

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
