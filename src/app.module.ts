import { Module } from '@nestjs/common';
import { LogsModule } from './_logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { FilesModule } from './files/files.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    NatsModule,
    AuthModule,
    FilesModule,
    DocumentsModule,
    LogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
