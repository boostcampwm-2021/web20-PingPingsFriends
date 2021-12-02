import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseOptionalStringPipe implements PipeTransform<string | undefined> {
  transform(value: string | undefined, metadata: ArgumentMetadata): string | undefined {
    if (!['string', 'undefined'].includes(typeof value)) throw new BadRequestException();
    return value;
  }
}
