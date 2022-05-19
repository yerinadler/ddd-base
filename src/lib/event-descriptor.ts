import { IEvent } from './event.interface';

export class EventDescriptor {
  constructor(
    public readonly aggregateGuid: string,
    public readonly aggregateName: string,
    public readonly payload: IEvent,
    public readonly version: number
  ) {}
}
