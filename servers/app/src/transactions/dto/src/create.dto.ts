// NestJs Imports
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
// Schemas
import {
  TransactionStatusC,
  TransactionTypesC,
  type TransactionTypesT,
  type TransactionStatusT,
} from '@library/schema';
// Constants
import { JOI_MESSAGES } from '@library/constants';

export class CreateDTO {
  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Reservation ID')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: '123' })
  public readonly reservationId?: string;

  @JoiSchema(Joi.number().required().label('Amount').messages(JOI_MESSAGES))
  @ApiProperty({ example: 300 })
  public readonly amount!: number;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...TransactionTypesC)
      .label('Type')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 300 })
  public readonly type!: TransactionTypesT;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...TransactionStatusC)
      .label('Status')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 300 })
  public readonly status!: TransactionStatusT;

  @JoiSchema(
    Joi.string().required().label('Payment Method').messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'gcash' })
  public readonly paymentMethod!: string;

  @JoiSchema(
    Joi.string().required().label('Reference Number').messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: '123' })
  public readonly referenceNumber!: string;

  @JoiSchema(Joi.string().required().label('Paid At').messages(JOI_MESSAGES))
  @ApiProperty({ example: '2000-01-01' })
  public readonly paidAt!: string;
}
