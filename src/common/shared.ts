import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityCustom {
  @ApiProperty()
  @CreateDateColumn({ name: 'lastTime' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'createdOn' })
  updatedAt: Date;
}
