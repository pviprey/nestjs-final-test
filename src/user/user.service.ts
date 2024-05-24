import { ConflictException, HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<void> {       
        this.userModel.create({
            email: email,
        });
    }

    async getUser(email: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                email: email,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.userModel.destroy({
            where: {},
        });
    }
}
