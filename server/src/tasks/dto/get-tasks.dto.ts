import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export enum TaskFilterType {
  ASSIGNED_TO_ME = 'ASSIGNED_TO_ME',
  CREATED_BY_ME = 'CREATED_BY_ME',
}

export class GetTasksDto {
  @IsInt()
  @Type(() => Number)
  userId?: number;
  filterType?: TaskFilterType;
  completedAfter?: string;
  completedBefore?: string;
  executorId?: number;
  executorIds?: number[];
}
