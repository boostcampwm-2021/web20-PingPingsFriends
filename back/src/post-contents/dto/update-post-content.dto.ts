import { PartialType } from '@nestjs/swagger';
import { CreatePostContentDto } from './create-post-content.dto';

export class UpdatePostContentDto extends PartialType(CreatePostContentDto) {}
