import { nanoid } from 'nanoid';

import { ICommand } from './command.interface';

export abstract class Command implements ICommand {
  public guid: string;

  constructor(guid?: string) {
    this.guid = guid || nanoid();
  }
}
