import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASK_REPOSITORY')
        private taskModel: typeof Task,
    ) {}

    async addTask(name: string, userId: number, priority: number): Promise<void> {
        await this.taskModel.create({
            name: name,
            userId: userId,
            priority: priority,
        });
    }

    async getTaskByName(name: string): Promise<Task> {
        return await this.taskModel.findOne({
            where: {
                name: name,
            },
        });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return await this.taskModel.findAll({
            where: {
                userId: userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.taskModel.destroy({
            where: {},
        });
    }
}
