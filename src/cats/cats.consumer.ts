import { Process, Processor } from "@nestjs/bull";
import { Job } from 'bull';

@Processor('notification')
export class CatsConsumer {
  @Process('notification-cat')
  handleNotification(job: Job<unknown>) {
    console.log(job.data);
  }
}