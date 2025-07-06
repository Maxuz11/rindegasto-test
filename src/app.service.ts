import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { enviromentVariables } from './config';
import { firstValueFrom } from 'rxjs';
import { RindegastinoBirthDay, ValidDate } from './model/RindegastinoBirthDay';
import { DbService } from 'db.service';
import 'dayjs/locale/es';
import * as dayjs from 'dayjs';
import { CrazyNumbers } from './model/CrazyNumbers';

export interface convertionParams {
  from: string;
  to: string;
  amount: string
}

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    private readonly dbservice: DbService
  ){}

  async converTo(body: convertionParams): Promise<string> {
    const url: string = enviromentVariables.url_api_exchange+`latest.json?app_id=${enviromentVariables.api_id_exchange}`;

    try {
      const apiResponse = await firstValueFrom(this.httpService.get(url));
      const rates = apiResponse.data?.rates;
      const mount: number = Number.parseFloat(body.amount);
      const from = rates[body.to];
      const to = rates[body.from];

      if(!to || !from) return 'Una de las divisas no encontrada';
      const toUsd = mount * from;
      const result = toUsd / to;
      return result.toFixed(2).toString();

    } catch (error) {
      return 'Error al realizar la peticion';
    }
  }

  safeRindegastinoBirthday(rindegastino: RindegastinoBirthDay){
    const safe = this.dbservice.addRindegastino(rindegastino);
    if(!safe){
      return 'Error en la insercion de datos';
    }
    return 'Rindegastino Insertado';
  }

  getDaytoBirthday(date: ValidDate) {
    dayjs.locale('es');
    const now = dayjs();

    /** parse birthday manualy */
    const parts = date.birthdate.split('-');
    const birthdayToDayJs = dayjs(new Date(+parts[2], +parts[1] - 1, +parts[0]));

    let birthdayThisYear = birthdayToDayJs.year(now.year());

    /** check if the birthday was before today and add a year to calculate */
    if (birthdayThisYear.isBefore(now, 'day')) {
      birthdayThisYear = birthdayThisYear.add(1, 'year');
    }
    return this.daysUntilBirthday(now, birthdayThisYear);
  }

  private daysUntilBirthday(dateFrom, dateTo): string{
    const days = dateTo.diff(dateFrom, 'day');
    return `Faltan ${days} dias para tu rindegastoCumpleaños`;
  }

  getAllRindegastinosDays(){
    const data = this.dbservice.getAll();

    const list = data.map(a => {
      var days = this.getDaytoBirthday({birthdate: a['birthday']});
      return {...a,days}
    });
    return list;
  }

  concatCrazyNumbersPlus(numbers: CrazyNumbers): string{
    let f = Number.parseInt(numbers.first);
    let s = Number.parseInt(numbers.second);
    let concat = '';
    for(let i = 1; i <= s; i++){
      concat+=((f*i).toString());
    }
     return concat.slice(0, 9);
  }
}