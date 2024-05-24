import { Controller, Get, Param, Post, Delete, Body, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller()
export class TaskController {
    constructor(private readonly TaskService: TaskService) {}

    @Post()
    async addTask(@Body('name') name: string, @Body('userId') userId: number, @Body('priority') priority: number): Promise<void> {
        if(name === undefined || name.length === 0){
            throw new BadRequestException('Adding task cancelled. The name is invalid.');
        }
        if(userId === undefined || userId < 0 || typeof userId !== 'number'){
            throw new BadRequestException('Adding task cancelled. The userId is invalid.');
        }
        if(priority === undefined || priority < 1 || typeof priority !== 'number'){
            throw new BadRequestException('Adding task cancelled. The priority is invalid.');
        }

        await this.TaskService.addTask(name, userId, priority);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: number): Promise<Task[]> {
        if(userId === undefined || userId < 0 || typeof userId !== 'number'){
            throw new BadRequestException('Adding task cancelled. The userId is invalid.');
        }
        
        return await this.TaskService.getUserTasks(userId);
    }

    async resetData(): Promise<void> {
        await this.TaskService.resetData();
    }
}
