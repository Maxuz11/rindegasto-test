import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Convert } from './model/Convert';
import { RindegastinoBirthDay, ValidDate } from './model/RindegastinoBirthDay';
import { CrazyNumbers } from './model/CrazyNumbers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //1.-
  @Get('/getConvertedAmount')
  async convertTodolars(@Query(new ValidationPipe({ transform: true })) data: Convert): Promise<string>{
    return await this.appService.converTo(data);
  }

  //2.-
  //params in bosy {name, birthdate}
  @Post('/postRindegastinoCumple')
  safeBirthDay(@Body() r:RindegastinoBirthDay){
    return this.appService.safeRindegastinoBirthday(r);
  }

  //params in url birthdate
  @Get('/getDaysUntilMyBirthday')
  getDaysUntilBirthday(@Query(new ValidationPipe({ transform: true })) birthdate: ValidDate){
    return this.appService.getDaytoBirthday(birthdate);
  }

  @Get('/getRindegastinosBirthdays')
  getRindegastinosBirthdays(){
    return this.appService.getAllRindegastinosDays();
  }

  //3.-
  //params in url first,second
  @Get('/getTheNumber')
  getTheNumber(@Query(new ValidationPipe({ transform: true })) data: CrazyNumbers){
    return this.appService.concatCrazyNumbersPlus(data);
  }
}
