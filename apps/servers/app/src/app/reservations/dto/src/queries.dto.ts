// NestJs Imports
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
// Library
import {
  // Constants
  JOI_MESSAGES,
  ReservationStatusC,
  // Types
  type ReservationStatusT,
} from "@servers/library";

export class QueriesDTO {
  @JoiSchema(Joi.string().required().label("Page").messages(JOI_MESSAGES))
  @ApiProperty({
    example: "1",
  })
  public readonly page!: string;

  @JoiSchema(Joi.string().required().label("Limit").messages(JOI_MESSAGES))
  @ApiProperty({
    example: "10",
  })
  public readonly limit!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .valid(...ReservationStatusC, "all")
      .default("pending")
      .label("Status")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "pending" })
  public readonly status!: ReservationStatusT & "all";

  // @JoiSchema(
  //   Joi.string()
  //     .optional()
  //     .allow("")
  //     .default(null)
  //     .label("Search")
  //     .messages(JOI_MESSAGES),
  // )
  // @ApiProperty({
  //   example: "John Doe",
  // })
  // public readonly search!: UserRolesT;
}
