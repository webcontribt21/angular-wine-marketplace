export class errorGQL {
  constructor(
    public error: { auth: boolean, message: string },
    public statusCode: number,
  ) {};
}
