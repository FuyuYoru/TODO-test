import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskMemberGuard } from './guard/task-member.guard';
import { TaskCreatorGuard } from './guard/task-creator.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TaskMemberGuard)
  async updateTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() taskData: CreateTaskDto,
  ) {
    return this.tasksService.updateTask(taskId, taskData);
  }

  @Delete(':id')
  @UseGuards(TaskCreatorGuard)
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
