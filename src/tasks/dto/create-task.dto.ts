import { Priority } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Install Dependency',
  })
  title!: string;

  @ApiProperty({
    example: 'Menginstal Dependency A, B, C, D',
  })
  description?: string;

  @ApiProperty({
    example: 1,
  })
  projectId!: number;
}
