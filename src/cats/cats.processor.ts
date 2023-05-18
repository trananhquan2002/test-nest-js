import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('notification')
export class CatsProcessor {
  private readonly logger = new Logger(CatsProcessor.name);
   @Process('notification-cat')
   handleNotification(job: Job<unknown>) {
    this.logger.debug('start notification');
    this.logger.debug(job.data);
    this.logger.debug('finish notification');
   }
}