import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({
    example: 'Update Project',
  })
  name?: string;

  @ApiProperty({
    example: 'Mengupdate Project ini',
  })
  description?: string;
}
