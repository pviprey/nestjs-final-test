import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller()
export class TaskController {
    constructor(private readonly TaskService: TaskService) {}

    @Get(':userId')
    async addTask(@Param('name') name: string, @Param('userId') userId: string, @Param('priority') priority: number): Promise<void> {
        this.TaskService.addTask(name, userId, priority);
    }

    @Post(':name')
    async getTaskByName(@Param('name') name: string): Promise<Task> {
        return this.TaskService.getTaskByName(name);
    }

    async resetData(): Promise<void> {
        return this.TaskService.resetData();
    }
}
