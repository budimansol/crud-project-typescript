import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private activityLogService: ActivityLogsService
  ) {}

  async create(dto: CreateTaskDto, userId:number) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        projectId: dto.projectId,
        createdById: userId,
      },
      include: {
        project: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    await this.activityLogService.create(
      userId,
      'Create_Task',
      `Created_Task: ${task.title}`,
    );
    
    return {
      success: true,
      message: 'Task Created Success',
      data: task,
    }
  }

  async findAll() {
    const Tasks = await this.prisma.task.findMany({
    })
    
    return {
      success: true,
      message: 'Get All Tasks Success',
      data: Tasks
    }
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {id},
      include: {
        project: true
      }
    })
    return {
      success: true,
      message: 'Get One Task Success',
      data: task
    }
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.update({
      where: {id},
      data: dto
    });
    
    await this.activityLogService.create(
      userId,
      'Create_Task',
      `Created_Task: ${task.title}`,
    );
    
    return {
      success: true,
      message: 'Updated Task Success',
      data: task
    }
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: {id}
    })
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    
    await this.prisma.task.delete({
      where: { id },
    });
    
    await this.activityLogService.create(
      userId,
      'Delete Task',
      `Deleted_Task: ${task.title}`,
    );
    
    return {
      success: true,
      message: 'Delete Task Success',
      data: task
    }
  }
}