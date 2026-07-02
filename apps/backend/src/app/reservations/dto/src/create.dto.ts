// NestJs Imports
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
// Shared
import {
  // Constants
  JOI_MESSAGES,
  ReservationStatusC,
  // Types
  type ReservationStatusT,
} from "@crud1/shared";

export class CreateDTO {
  @JoiSchema(
    Joi.string()
      .allow("")
      .default(null)
      .label("Property ID")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly propertyId!: string;

  @JoiSchema(
    Joi.string()
      .allow("")
      .default(null)
      .label("Agent ID")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly agentId!: string;

  @JoiSchema(
    Joi.string().required().label("Customer ID").messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly customerId!: string;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...ReservationStatusC)
      .label("Status")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "pending" })
  public readonly status!: ReservationStatusT;

  @JoiSchema(
    Joi.string().required().label("Reservation Fee").messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly reservationFee!: string;

  @JoiSchema(
    Joi.string().required().label("Reservation Date").messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "2000/01/01" })
  public readonly reservationDate!: string;

  @JoiSchema(Joi.string().required().label("Expires At").messages(JOI_MESSAGES))
  @ApiProperty({ example: "2000/01/01" })
  public readonly expiresAt!: string;

  @JoiSchema(
    Joi.string()
      .allow("")
      .default(null)
      .label("Remarks")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Sample remarks here" })
  public readonly remarks!: string;
}
