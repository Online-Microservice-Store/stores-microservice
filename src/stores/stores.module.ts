import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [
    NatsModule
  ]
})
export class StoresModule {}
