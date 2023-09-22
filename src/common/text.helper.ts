import { IsNumber, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export function radomText(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function radomNumber(length: number): string {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function createPagination<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    total: total,
    records: data,
    currentPage: page,
    pageSize: pageSize,
  };
}
export class ResPaginationDto {
  @ApiProperty({ example: ' ' })
  @IsOptional()
  keyword?: string | null;

  @ApiProperty({ example: ' ' })
  @IsOptional()
  id?: string | null;

  @ApiProperty({ example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  page: number;
}

export class ResPagination {
  @ApiProperty({ example: ' ' })
  @IsOptional()
  keyword?: string | null;

  @ApiProperty({ example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  page: number;
}
export class ResPaginationListBet {
  @ApiProperty({ example: ' ' })
  @IsOptional()
  keyword?: string | null;

  @ApiProperty({ example: 1 })
  @IsNumber()
  idGame: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  page: number;
}

export class ResPaginationHisBet {
  @ApiProperty({ example: ' ' })
  @IsOptional()
  keyword?: string | null;

  @ApiProperty({ example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  page: number;
}

export function resultData({
  statusCode = HttpStatus.OK,
  message = '',
  data = null,
}: {
  statusCode?: number;
  message?: string;
  data?: any;
}) {
  return {
    statusCode,
    message,
    data,
  };
}

export function getFLWeek(): {
  firstDay: {
    date: Date;
    string: string;
  };
  lastDay: {
    date: Date;
    string: string;
  };
} {
  const today = new Date();
  today.setHours(0);
  today.setUTCMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  function getFirstDayOfWeek(d: Date) {
    const date = new Date(d);
    const day = date.getDay();

    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

  const firstDay = getFirstDayOfWeek(today);

  const lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 7);

  return {
    firstDay: {
      date: firstDay,
      string: firstDay.toLocaleDateString('en-GB'),
    },
    lastDay: {
      date: lastDay,
      string: lastDay.toLocaleDateString('en-GB'),
    },
  };
}

export const deleteFile = async (file: string) => {
  try {
    const unlickSync = promisify(fs.unlink);
    await unlickSync(`./upload${file}`);
  } catch (err) {
    console.log(err);
  }
};
