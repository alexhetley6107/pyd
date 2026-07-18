import { ApiPropertyOptional } from '@nestjs/swagger';

export class BoardQueryDto {
  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Number of items to return', default: 10 })
  limit?: string;

  @ApiPropertyOptional({ description: 'Offset for pagination', default: 0 })
  offset?: string;
}
