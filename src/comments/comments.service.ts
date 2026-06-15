import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(taskId: number, dto: CreateCommentDto, userId: number) {
    
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });
    
    if (!task){
        return new NotFoundException('Task not Found');
    }
    
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        taskId,
        userId,
      },
      include: {
        task: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  findByTask(taskId: number) {
    return this.prisma.comment.findMany({
      where: {
        taskId: taskId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}