import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [StoresModule, NatsModule, SuscriptionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
