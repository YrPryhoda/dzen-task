import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsNumberString,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsNumberString()
  parent: number;
}
