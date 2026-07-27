// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Modules
import { PropertiesService } from "./properties.service";
import { PropertiesController } from "./properties.controller";
// Shared
import {
  JWTModule,
  // Schema
  Property,
  PropertySchema,
} from "@crud1/shared";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // Property
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
    JWTModule,
  ],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
