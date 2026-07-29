// NestJs Imports
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
// Library
import { JOI_MESSAGES } from "@servers/library";

export class LoginDTO {
  @JoiSchema(Joi.string().required().label("Email").messages(JOI_MESSAGES))
  @ApiProperty({ example: "johndoe@gmail.com" })
  public readonly email?: string | null;

  @JoiSchema(Joi.string().required().label("Password").messages(JOI_MESSAGES))
  @ApiProperty({ example: "Sample123" })
  public readonly password?: string;
}
