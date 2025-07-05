import 'dotenv/config';
import * as joi from 'joi';

interface EnviromentsVariables {
    PORT: number,
    URL_API_EXCHANGE: string,
    API_ID_EXCHANGE: string
}

const enviromentSchema = joi.object({
    PORT: joi.number().required(),
    URL_API_EXCHANGE: joi.string().required(),
    API_ID_EXCHANGE: joi.string().required(),

}).unknown();


const { error, value } = enviromentSchema.validate({
    ...process.env
});

if(error){
    throw new Error(`Enviroment error ${error}`);
}

const env: EnviromentsVariables = value;

export const enviromentVariables = {
    port: env.PORT,
    url_api_exchange: env.URL_API_EXCHANGE,
    api_id_exchange: env.API_ID_EXCHANGE
}