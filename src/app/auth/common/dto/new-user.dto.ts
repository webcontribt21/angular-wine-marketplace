export class newUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public userTypeNo: number
  ) {}
}
