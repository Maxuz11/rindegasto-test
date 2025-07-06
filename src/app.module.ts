import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { DbService } from 'db.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
