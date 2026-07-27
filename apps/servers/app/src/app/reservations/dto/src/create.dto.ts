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
    Joi.string().required().label("Property ID").messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "RL-01KWHGKSSJK9ZKARK0079WWCRB" })
  public readonly propertyId?: string;

  @JoiSchema(Joi.string().required().label("Agent ID").messages(JOI_MESSAGES))
  @ApiProperty({ example: "RL-01KWHGKSSJK9ZKARK0079WWCRB" })
  public readonly agentId?: string;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...ReservationStatusC)
      .default("pending")
      .label("Status")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "pending" })
  public readonly status!: ReservationStatusT;

  @JoiSchema(
    Joi.number().required().label("Reservation Fee").messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 100.0 })
  public readonly reservationFee!: number;

  @JoiSchema(
    Joi.string().required().label("Reserved At").messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "2023-10-10T10:00:00Z" })
  public readonly reservedAt!: string;

  @JoiSchema(Joi.string().required().label("Expires At").messages(JOI_MESSAGES))
  @ApiProperty({ example: "2023-10-10T10:00:00Z" })
  public readonly expiresAt!: string;

  @JoiSchema(Joi.string().required().label("Remarks").messages(JOI_MESSAGES))
  @ApiProperty({ example: "Additional information about the reservation" })
  public readonly remarks?: string;
}
