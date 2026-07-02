// NestJs Imports
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// Modules
import { TransactionsService } from "./transactions.service";
// Shared
import {
  // Decorators
  HttpInterceptor,
} from "@crud1/shared";
// DTO's
import { CreateDTO, UpdateByIdDTO } from "./dto";

// @ApiBearerAuth("")
@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the transactions" })
  public async transactions() {
    return this.transactionsService.transactions();
  }

  @Get(":transactionId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a transaction by ID" })
  public async getById(@Param("transactionId") transactionId: string) {
    return this.transactionsService.getById(transactionId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Create a transaction" })
  public async create(@Body(JoiPipe) payload: CreateDTO) {
    return this.transactionsService.create(payload);
  }

  @Patch(":transactionId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Update transaction by ID" })
  public async updateById(
    @Param("transactionId") transactionId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
  ) {
    return this.transactionsService.updateById(transactionId, payload);
  }

  @Delete(":transactionId")
  @HttpCode(200)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Delete transaction by ID" })
  public async hardDeleteById(@Param("transactionId") transactionId: string) {
    return this.transactionsService.hardDeleteById(transactionId);
  }
}
