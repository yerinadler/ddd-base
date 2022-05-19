import { IMessage } from './message.interface';

export interface IEvent extends IMessage {
  eventName: string;
  aggregateName: string;
  version?: number;
}
