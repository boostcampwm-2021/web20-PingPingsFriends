export class CreateUserDto {
  username: string;
  password: string;
  nickname: string;
  habitatId: number;
  speciesId?: number;
  sound?: string;
  name?: string;
}
