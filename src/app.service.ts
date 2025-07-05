import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { enviromentVariables } from './config';
import { firstValueFrom } from 'rxjs';

export interface convertionParams {
  from: string;
  to: string;
  amount: string
}

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService
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
}