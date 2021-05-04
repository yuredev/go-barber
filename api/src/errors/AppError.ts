export default class Error {
  constructor(public readonly message: string, public readonly statusCode = 400) {}
}
