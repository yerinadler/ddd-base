import { IEvent } from './event.interface';

export interface IEventBus {
  publish(channel: string, event: IEvent): Promise<void>;
  subscribeEvents(): Promise<void>;
}
