import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { UserModule } from '../user/user.module';
import { taskProviders } from './task.providers';

@Module({
    imports: [DatabaseModule, UserModule],
    providers: [TaskService, ...taskProviders],
    controllers: [TaskController],
})
export class TaskModule {}
