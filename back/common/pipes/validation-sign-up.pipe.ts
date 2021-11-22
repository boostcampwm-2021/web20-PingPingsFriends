import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ParseUsernamePipe implements PipeTransform<CreateUserDto, CreateUserDto> {
  transform(value: CreateUserDto, metadata: ArgumentMetadata): CreateUserDto {
    const re = /^[a-z]+[a-z0-9]{4,19}$/gi;
    if (!re.test(value.username)) throw new BadRequestException();
    return value;
  }
}
