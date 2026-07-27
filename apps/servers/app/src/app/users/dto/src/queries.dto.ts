// NestJs Imports
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
// Shared
import {
  // Constants
  UserRoleSC,
  JOI_MESSAGES,
  // Types
  type UserRolesT,
} from "@crud1/shared";

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
      .valid(...UserRoleSC, "all")
      .allow("")
      .default("all")
      .label("Role")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: "client",
  })
  public readonly role!: UserRolesT | "all";

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Search")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: "John Doe",
  })
  public readonly search!: UserRolesT;
}
