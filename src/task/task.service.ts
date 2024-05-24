import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TASK_REPOSITORY')
        private taskModel: typeof Task,
    ) {}

    async addTask(name: string, userId: string, priority: number): Promise<void> {
        try{
            await this.taskModel.create({
                name: name,
                userId: userId,
                priority: priority,
            });
        }catch(e){
            console.log("FTO!!Error in adding task");
        }
    }

    async getTaskByName(name: string): Promise<Task> {
        try{
            return await this.taskModel.findOne({
                where: {
                    name: name,
                },
            });
        }catch(e){
            console.log("FTO!!Error in getting task");
        }
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        try{
            return await this.taskModel.findAll({
                where: {
                    userId: userId,
                },
            });
        }catch(e){
            console.log("FTO!!Error in getting user tasks");
        }
    }

    async resetData(): Promise<void> {
        await this.taskModel.destroy({
            where: {},
        });
    }
}
