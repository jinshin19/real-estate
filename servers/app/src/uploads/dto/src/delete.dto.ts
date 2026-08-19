// NestJs Imports
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
// Constants
import { JOI_MESSAGES } from '@library/constants';

export class DeleteDTO {
  @JoiSchema(
    Joi.string().required().label('Selected IDs').messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: ['123', '1234'],
  })
  public readonly selectedIds!: string[];
}
