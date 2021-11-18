import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe
  implements PipeTransform<string, number | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata
  ): number | undefined {
    if (!value) return undefined;
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
