import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma:PrismaService, private activityLogService:ActivityLogsService){}
    
    async create(dto: CreateProjectDto, userId: number){
        const project = await this.prisma.project.create({
            data:{
                name: dto.name,
                description: dto.description,
                createdById: userId
            }
        });
        
        await this.activityLogService.create(
            userId,
            'Create_Project',
            `Created_Project: ${project.name}`
        )
        
        return {
          success: true,
          message: 'Create Project Success',
          data: project,
        };
        
    }
    
    async findAll(){
        const projects = await this.prisma.project.findMany({})
        
        return {
            success: true,
            message: 'Get Projects Success',
            data: projects
        }
    }
    
    async findOne(id: number){
        const project = await this.prisma.project.findUnique({
            where: {id},
            include: {
                task: true,
                createdBy: true,
            }
        });
        
        return {
            success: true,
            message: 'Get Project Success',
            data: project
        }
    }
    
    async update(id: number, dto: UpdateProjectDto, userId: number){
        const project = await this.prisma.project.update({
            where: {
                id: id,
            },
            data: dto
        })
        
        await this.activityLogService.create(
            userId,
            'Update_Project',
            `Updated_Project: ${userId}`
        )
        return {
            success: true,
            message: 'Updated Project Success',
            data: project
        };
    }
    
    async delete(id: number, userId: number){
        
        const project = await this.prisma.project.findUnique({
            where: {id}
        })
        
        await this.prisma.project.delete({
            where: {id},
        });
        
        await this.activityLogService.create(
            userId,
            'Delete_Project',
            `Deleted_Project ${userId}`
        );
        
        return {
          success: true,
          message: "Delete Project success",
          data : project
        };
    }
}
