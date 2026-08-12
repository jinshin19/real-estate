// NestJs Imports
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
// Constants
import { JOI_MESSAGES } from '@library/constants';
// Schemas
import { ReservationStatusC, type ReservationStatusT } from '@library/schema';

export class UpdateByIdDTO {
  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Agent ID')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'RL-01KWHGKSSJK9ZKARK0079WWCRB' })
  public readonly agentId?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .valid(...ReservationStatusC)
      .default('pending')
      .label('Status')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'pending' })
  public readonly status?: ReservationStatusT;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Remarks')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'Additional information about the reservation' })
  public readonly remarks?: string;
}
