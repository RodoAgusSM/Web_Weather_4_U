export interface ICommand<T = void> {
  execute(): Promise<T>;
  undo?(): Promise<void>;
}

export interface ICommandHandler<TCommand extends ICommand, TResult = void> {
  handle(command: TCommand): Promise<TResult>;
}
