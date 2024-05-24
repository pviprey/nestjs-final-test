import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { userProviders } from './user.provider';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, ...userProviders],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
