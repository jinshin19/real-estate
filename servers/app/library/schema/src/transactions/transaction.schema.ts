// Constants
export const TransactionTypesC = [
  'down-payment',
  'full-payment',
  'reservation-fee',
  'monthly-payment',
] as const;

export const TransactionStatusC = [
  'paid',
  'pending',
  'failed',
  'refunded',
  'cancelled',
  'processing',
] as const;

// NestJs Imports
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
// Utils
import { SYSTEM_ID } from '../../../utils';
// Schema options
import { schemaOptions } from '../../src/schema.options';

export const RLTransactionsCN = 'rl-transactions';

@Schema({
  collection: RLTransactionsCN,
  ...schemaOptions,
})
export class Transaction {
  @Prop({ type: String, default: () => SYSTEM_ID() })
  public readonly _id!: string;

  @Prop({ type: String, required: true })
  public reservationId!: string;

  @Prop({ type: Number, required: true })
  public amount!: number;

  @Prop({ type: String, enum: TransactionTypesC, required: true })
  public type!: TransactionTypesT;

  @Prop({ type: String, enum: TransactionStatusC, required: true })
  public status!: TransactionStatusT;

  @Prop({ type: String, required: true })
  public paymentMethod!: string;

  @Prop({ type: String, required: true })
  public referenceNumber!: string;

  @Prop({ type: String, required: true })
  public paidAt!: string;

  @Prop({ type: Boolean, default: false })
  public isDeleted!: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

export type TransactionTypesT = (typeof TransactionTypesC)[number];
export type TransactionStatusT = (typeof TransactionStatusC)[number];
