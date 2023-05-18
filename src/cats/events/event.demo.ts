import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class EventDemo {
  constructor(private eventEmitter: EventEmitter2) { }
  
  emitEvent() {
    this.eventEmitter.emit('msg.sent', 'Chào bạn Quân, mình là ChatGPT');
  }

  @OnEvent('msg.sent')
  listenToEvent(msg: string) {
    console.log('Message Received : ', msg);
  }
}