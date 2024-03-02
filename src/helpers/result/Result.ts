export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: string;
  private _value?: T;

  constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error('Sucesso e erro nao podem estar iguais');
    }
    if (!isSuccess && !error) {
      throw new Error(`Resultado falho precisa de uma mensagem
            `);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Resultados falho nao retornam valores`);
    }

    return this._value!;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}
