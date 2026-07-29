// NestJs Imports
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";
import { ApiProperty } from "@nestjs/swagger";
// Library
import {
  // Constants
  JOI_MESSAGES,
  PropertyStatusC,
  // Types
  type PropertyStatusT,
  type PropertyLocationI,
  type PropertySpecficationI,
} from "@servers/library";

export class UpdateByIdDTO {
  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Title")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Property 1" })
  public readonly title!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Description")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Description goes here" })
  public readonly description?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Project ID")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly projectId?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("House Model ID")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly houseModelId!: string;

  @JoiSchema(
    Joi.number()
      .optional()
      .allow("")
      .default(null)
      .label("Price")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 300 })
  public readonly price!: number;

  @JoiSchema(
    Joi.number()
      .optional()
      .allow("")
      .default(null)
      .label("Reservation Fee")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: 300 })
  public readonly reservationFee!: number;

  @JoiSchema(
    Joi.number()
      .optional()
      .allow("")
      .default(null)
      .label("Reservation Date")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "2000-01-01" })
  public readonly reservationDate!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .valid(...PropertyStatusC)
      .label("Title")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "available" })
  public readonly status!: PropertyStatusT;

  @JoiSchema(
    Joi.boolean()
      .optional()
      .allow("")
      .default(null)
      .default(false)
      .label("Is Featured")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: true })
  public readonly isFeatured!: boolean;

  @JoiSchema(
    Joi.boolean()
      .optional()
      .allow("")
      .default(null)
      .default(false)
      .label("Is Published")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: true })
  public readonly isPublished!: boolean;

  @JoiSchema(
    Joi.object()
      .optional()
      .allow("")
      .default(null)
      .label("Location")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: {
      country: "Philippines",
      province: "n-a",
      city: "Valenzuela City",
      barangay: "n-a",
      street: "n-a",
      zipCode: "1440",
      block: "n-a",
      lot: "n-a",
      latitude: "n-a",
      longitude: "n-a",
    },
  })
  public readonly location!: PropertyLocationI;

  @JoiSchema(
    Joi.array()
      .optional()
      .allow("")
      .default(null)
      .label("Images")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: ["sample1.png", "sample2.png"] })
  public readonly images!: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Features")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "Property 1" })
  public readonly features?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Specifications")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({
    example: {
      lotArea: "",
      floodArea: "",
      bedrooms: "",
      garageSlot: "",
      floors: "",
    },
  })
  public readonly specifications!: PropertySpecficationI;

  @JoiSchema(
    Joi.string()
      .optional()
      .allow("")
      .default(null)
      .label("Created By")
      .messages(JOI_MESSAGES),
  )
  @ApiProperty({ example: "123" })
  public readonly createdBy?: string;
}
