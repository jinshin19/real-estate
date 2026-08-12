// NestJs Imports
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Services
import { JWTModule } from '@library/services';
// Schema
import { Property, PropertySchema } from '@library/schema';
// Modules
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';

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
