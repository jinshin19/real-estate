// NestJs Imports
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
// Constants
import { JOI_MESSAGES } from '@library/constants';
// Schemas
import { PropertyStatusC, type PropertyStatusT } from '@library/schema';

export class QueriesDTO {
  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .default(null)
      .label('Search')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: 'John Doe',
  })
  public readonly search!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow('')
      .valid(...PropertyStatusC, 'all')
      .default('all')
      .label('Status')
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: 'John Doe',
  })
  public readonly status!: PropertyStatusT | 'all';

  @JoiSchema(Joi.number().required().label('Page').messages(JOI_MESSAGES))
  @ApiProperty({
    example: 1,
  })
  public readonly page!: number;

  @JoiSchema(Joi.number().required().label('Limit').messages(JOI_MESSAGES))
  @ApiProperty({
    example: 5,
  })
  public readonly limit!: number;
}
