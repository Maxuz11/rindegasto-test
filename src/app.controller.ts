import { BadRequestException, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService, convertionParams } from './app.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { Convert } from './model/Convert';
import { validate } from 'class-validator';

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

    /** Valid the params in the url */
    const ConvertDto = plainToInstance(Convert, body);
    const errors = await validate(ConvertDto);
    if(errors.length > 0){
      const message = errors.map( e => Object.values(e.constraints)).flat();
      throw new BadRequestException(message);
    }

    return await this.appService.converTo(body);
  }
}
