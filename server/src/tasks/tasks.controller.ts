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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskMemberGuard } from './guard/task-member.guard';
import { TaskCreatorGuard } from './guard/task-creator.guard';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { Task } from '@prisma/client';
import { GetTasksDto } from '@/tasks/dto/get-tasks.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  async getTasks(@Body() dto: GetTasksDto) {
    console.log(dto);
    const result = await this.tasksService.getTasks(dto);
    return { result: result };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TaskMemberGuard)
  async updateTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() taskData: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(taskId, taskData);
  }

  @Delete(':id')
  @UseGuards(TaskCreatorGuard)
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}
