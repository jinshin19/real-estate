// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Modules
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
// Library
import {
  // Schema
  Transaction,
  TransactionSchema,
} from "@servers/library";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // User
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
