import { ICommandHandler } from './command-handler.interface';

export interface ICommandBus {
  registerHandler<TCommand>(commandName: string, handler: ICommandHandler<TCommand>): void;
  send<TCommand>(command: TCommand): void;
}
