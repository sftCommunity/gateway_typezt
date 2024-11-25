import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { DocumentsController } from './documents.controller';
@Module({
  controllers: [DocumentsController],
  imports: [NatsModule],
})
export class DocumentsModule {}
