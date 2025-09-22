import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackingController } from './packing/packing.controller';
import { PackingService } from './packing/packing.service';

@Module({
  imports: [],
  controllers: [AppController, PackingController],
  providers: [AppService, PackingService],
})
export class AppModule {}
