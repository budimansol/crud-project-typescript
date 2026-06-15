import { Controller, Body, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@ApiBearerAuth('accessToken')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService){}
    
    @Post()
    create(@Body() dto: CreateProjectDto, @Req() req){
        return this.projectService.create(dto, req.user.id);
    }
    
    @Get()
    findAll(){
        return this.projectService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.projectService.findOne(Number(id));
    }
    
    @Patch(':id')
    update(
        @Param('id') id : string,
        @Body() dto: UpdateProjectDto,
        @Req() req
    ){
        return this.projectService.update(Number(id), dto, req.user.id);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req){
        return this.projectService.delete(Number(id), req.user.id);
    }
    
}
