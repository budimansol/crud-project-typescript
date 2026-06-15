import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Dzakky Budiman',
  })
  name!: string;

  @ApiProperty({
    example: 'budiman@mail.com',
  })
  email!: string;

  @ApiProperty({
    example: 'password123',
  })
  password!: string;
}
