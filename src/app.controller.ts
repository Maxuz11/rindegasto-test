import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService, convertionParams } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getConvertedAmount')
  async convertTodolars(@Req() request: Request): Promise<string>{
    const {from, to, amount} = request.query;
    const body: convertionParams = {
      from: from?.toString(),
      to: to?.toString(),
      amount: amount?.toString()
    }
    return await this.appService.converTo(body);
  }
}
