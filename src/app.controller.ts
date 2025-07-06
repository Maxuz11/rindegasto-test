import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Convert } from './model/Convert';
import { RindegastinoBirthDay, ValidDate } from './model/RindegastinoBirthDay';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //1.-
  @Get('/getConvertedAmount')
  async convertTodolars(@Query(new ValidationPipe({ transform: true })) data: Convert): Promise<string>{
    return await this.appService.converTo(data);
  }

  //2.-
  //recibira por body los parametros {name,birthday}
  @Post('/postRindegastinoCumple')
  safeBirthDay(@Body() r:RindegastinoBirthDay){
    return this.appService.safeRindegastinoBirthday(r);
  }

  @Get('/getDaysUntilMyBirthday')
  getDaysUntilBirthday(@Query(new ValidationPipe({ transform: true })) birthdate: ValidDate){
    return this.appService.getDaytoBirthday(birthdate);
  }

  @Get('/getRindegastinosBirthdays')
  getRindegastinosBirthdays(){
    return this.getRindegastinosBirthdays();
  }
}
