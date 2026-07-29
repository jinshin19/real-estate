// NestJs Imports
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
// Library
import {
  // Types
  type UserRolesT,
  type UserGenderT,
  // Constants
  UserRoleSC,
  UserGenderC,
  JOI_MESSAGES,
} from "@servers/library";

export class RegisterDTO {
  @JoiSchema(Joi.string().required().label("First Name").messages(JOI_MESSAGES))
  @ApiProperty({ example: "John" })
  public readonly firstName!: string;

  @JoiSchema(Joi.string().required().label("Last Name").messages(JOI_MESSAGES))
  @ApiProperty({ example: "Doe" })
  public readonly lastName!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Middle Name")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Dimenez" })
  public readonly middleName?: string | null;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Contact Number")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: "09328523895",
    examples: ["+6399123123", "09328523895"],
  })
  public readonly contactNumber?: string | null;

  @JoiSchema(Joi.string().required().label("Birth Date").messages(JOI_MESSAGES))
  @ApiProperty({ example: "1999-01-30" })
  public readonly birthDate!: string;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...UserGenderC)
      .label("Gender")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Male" })
  public readonly gender!: UserGenderT;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Email")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "johndoe@gmail.com" })
  public readonly email?: string | null;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...UserRoleSC)
      .label("Role")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "client" })
  public readonly role!: UserRolesT;

  @JoiSchema(
    Joi.string().allow("").default(null).label("Photo").messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: "sample.png",
    examples: ["https://sample.com/sample.png", "sample.png"],
  })
  public readonly photo?: string | null;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Password")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Sample123" })
  public readonly password?: string | null;
}
