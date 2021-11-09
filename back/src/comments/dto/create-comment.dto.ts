import { IsNotEmpty } from "class-validator";
export class CreateCommentDto {
  @IsNotEmpty()
  post_id: number;

  @IsNotEmpty()
  content: string;
}
