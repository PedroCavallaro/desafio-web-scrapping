export class Classification<T> {
  score: keyof T;
  tile?: keyof T;
  values?: Array<Array<string>>;
}
