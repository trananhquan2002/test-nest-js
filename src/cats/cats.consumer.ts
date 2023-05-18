import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from 'bull';

@Processor('notification')
export class CatsConsumer {
  @Process('notification-cat')
  async handleNotification(job: Job<unknown>) {
    console.log(job.name);
  }
  // @OnQueueActive()
  // onActive(job: Job) {
  //   console.log('Processing job ' + job.id + ' of type ' + job.name + 'with data ' + job.data);
  // }
}