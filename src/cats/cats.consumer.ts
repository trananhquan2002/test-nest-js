import { Process, Processor } from "@nestjs/bull";
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('cat')
export class CatsConsumer {
  private readonly logger = new Logger(CatsConsumer.name);
  @Process('notification')
  handleNotification(job: Job) {
    this.logger.debug('Start notification');
    this.logger.debug(job.data);
    this.logger.debug('notification finished');
  }
}