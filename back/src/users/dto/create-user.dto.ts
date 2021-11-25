export class CreateUserDto {
  username: string;
  password: string;
  nickname: string;
  habitatId?: number;
  speciesId?: number;
  habitatName?: string;
  habitatColor?: string;
  speciesName?: string;
  speciesSound?: string;
}
