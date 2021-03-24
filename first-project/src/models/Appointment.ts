export default class Appointment {
  private _id: string;
  private _provider: string;
  private _date: Date;

  constructor(date: Date, provider: string, id: string) {
    this._provider = provider;
    this._date = date;
    this._id = id;
  }

  get date() {
    return this._date;
  }

  get provider() {
    return this._provider;
  }

  get id() {
    return this._id;
  }
}
