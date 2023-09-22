import { IsInt, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ default: 1 })
  @IsInt()
  @IsOptional()
  page: number;

  @ApiProperty({ default: 10 })
  @IsInt()
  @IsOptional()
  pageSize: number;
}
