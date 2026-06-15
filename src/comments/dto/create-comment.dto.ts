import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Sudah Selesai Dikerjakan',
  })
  content!: string;
}
