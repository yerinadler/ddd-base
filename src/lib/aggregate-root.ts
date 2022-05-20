/* eslint-disable @typescript-eslint/ban-types */
import capitalize from 'capitalize';
import { nanoid } from 'nanoid';

import { IEvent } from './event.interface';

export abstract class AggregateRoot {
  [x: string]: any;
  public guid: string;
  private __version = -1;
  private __changes: any[] = [];

  get version() {
    return this.__version;
  }

  constructor(guid?: string) {
    this.guid = guid || nanoid();
  }

  public getUncommittedEvents(): IEvent[] {
    return this.__changes;
  }

  public markChangesAsCommitted(): void {
    this.__changes = [];
  }

  protected applyChange(event: IEvent): void {
    this.applyEvent(event, true);
  }

  public loadFromHistory(events: IEvent[]): void {
    for (const event of events) {
      this.applyEvent(event);
      this.__version++;
    }
  }

  private applyEvent(event: IEvent, isNew = false): void {
    const handler: Function = this.getEventHandler(event);
    handler && handler.call(this, event);
    if (isNew) this.__changes.push(event);
  }

  protected getEventHandler(event: IEvent): Function {
    return this[`apply${this.getEventName(event)}`];
  }

  protected getEventName(event: IEvent): string {
    const [, extractedEventName]: string[] = event.eventName.split('/');
    const chunks: string[] = extractedEventName.split('-');
    return chunks.map((chunk: string) => capitalize(chunk)).join('');
  }
}
