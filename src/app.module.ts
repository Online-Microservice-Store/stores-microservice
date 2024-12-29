import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';

@Module({
  imports: [StoresModule, SuscriptionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
