// NestJs Imports
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
// Constants
import { JOI_MESSAGES } from '@library/constants';
// Schemas
import { AuditLogActionsC, type AuditLogActionsT } from '@library/schema';

export class CreateDTO {
  @JoiSchema(Joi.string().required().label('User ID').messages(JOI_MESSAGES))
  @ApiProperty({ example: '123' })
  public readonly userId!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Collection Name')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'sample' })
  public readonly collectionName?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Collection ID')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: '123' })
  public readonly collectionId?: string;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...AuditLogActionsC)
      .label('Action')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'sample' })
  public readonly action?: AuditLogActionsT;

  @JoiSchema(Joi.string().required().label('Field').messages(JOI_MESSAGES))
  @ApiProperty({ example: 'sample' })
  public readonly field!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Old Value')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'sample' })
  public readonly oldValue?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('New Value')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 'sample sample' })
  public readonly newValue?: string;

  @JoiSchema(Joi.string().required().label('User Agent').messages(JOI_MESSAGES))
  @ApiProperty({ example: 'chrome' })
  public readonly userAgent!: string;
}
