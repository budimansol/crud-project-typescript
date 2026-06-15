import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, action: string, description: string) {
    return this.prisma.activityLog.create({
      data: {
        userId,
        action,
        description,
      },
    });
  }

  async findAll() {
    const activity = await this.prisma.activityLog.findMany({
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
      }
    });
    
    return {
        success: true,
        message: 'Get Activities Success',
        data: activity
    }
  }
}