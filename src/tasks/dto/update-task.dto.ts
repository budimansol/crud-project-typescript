import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Install Dependency',
  })
  title?: string;

  @ApiProperty({
    example: 'Menginstal Dependency A, B, C, D',
  })
  description?: string;

  @ApiProperty({
    example: 1,
  })
  projectId?: number;

  @ApiProperty({
    enum: TaskStatus,
    example: 'DONE',
  })
  status?: TaskStatus;
}
