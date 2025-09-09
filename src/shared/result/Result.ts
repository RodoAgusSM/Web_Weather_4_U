export class Result<T, E = Error> {
  private constructor(
    private readonly success: boolean,
    private readonly value?: T,
    private readonly error?: E,
  ) {}

  static ok<T, E = Error>(value: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  static err<T = never, E = Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  isOk(): this is Result<T, never> {
    return this.success;
  }

  isErr(): this is Result<never, E> {
    return !this.success;
  }

  getValue(): T {
    if (!this.success) throw new Error('Cannot get value from error result');
    return this.value!;
  }

  getError(): E {
    if (this.success) throw new Error('Cannot get error from success result');
    return this.error!;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return this.success ? Result.ok<U, E>(fn(this.value!)) : Result.err<U, E>(this.error!);
  }

  mapError<F>(fn: (error: E) => F): Result<T, F> {
    return this.success ? Result.ok<T, F>(this.value!) : Result.err<T, F>(fn(this.error!));
  }

  async mapAsync<U>(fn: (value: T) => Promise<U>): Promise<Result<U, E>> {
    if (!this.success) return Result.err<U, E>(this.error!);
    try {
      const result = await fn(this.value!);
      return Result.ok<U, E>(result);
    } catch (error) {
      return Result.err<U, E>(error as E);
    }
  }

  fold<U>(onOk: (value: T) => U, onErr: (error: E) => U): U {
    return this.success ? onOk(this.value!) : onErr(this.error!);
  }
}
