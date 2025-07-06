import { Injectable } from "@nestjs/common";
import * as sf from 'fs'; //StreamingFiles from nest
import * as path from 'path';
import { RindegastinoBirthDay } from "src/model/RindegastinoBirthDay";

const PATH_DATA = path.join(process.cwd(), 'src/data/rindegastinoBirthDate.json')

@Injectable()
export class DbService {

    constructor(){
        console.log(PATH_DATA);
    }

    private readData(): any[] {
        if (!sf.existsSync(PATH_DATA)) {
            return [];
        }
        const body = sf.readFileSync(PATH_DATA, 'utf-8');
        const parseData = JSON.parse(body);
        return Array.isArray(parseData) ? parseData : [];
    }

    private writeData(data: any[]): void{
        sf.writeFileSync(PATH_DATA, JSON.stringify(data, null, 2),'utf-8');
    }

    getAll(){
        return this.readData();
    }

    addRindegastino(data: RindegastinoBirthDay){
        const dataSaved = this.readData();
        dataSaved.push(data);
        this.writeData(dataSaved);
        return true;
    }
}