// Constants
export const ReservationStatusC = [
  "paid",
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;

// NestJs Imports
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
// Utils
import { SYSTEM_ID } from "../../utils/id.utils.js";
// Schema options
import { schemaOptions } from "../schema.options.js";

export const RLReservationsCN = "rl-reservations";

@Schema({
  collection: RLReservationsCN,
  ...schemaOptions,
})
export class Reservation {
  @Prop({ type: String, default: () => SYSTEM_ID() })
  public readonly _id!: string;

  @Prop({ type: String, required: true })
  public propertyId!: string;

  @Prop({ type: String, required: true })
  public agentId!: string;

  @Prop({ type: String, required: true })
  public customerId!: string;

  @Prop({ type: String, required: true })
  public status!: string;

  @Prop({ type: String, required: true })
  public reservationFee!: string;

  @Prop({ type: String, required: true })
  public reservationDate!: string;

  @Prop({ type: String, required: true })
  public expiresAt!: string;

  @Prop({ type: String, default: null })
  public remarks?: string | null;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

export type ReservationStatusT = (typeof ReservationStatusC)[number];
