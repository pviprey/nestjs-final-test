import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<void> {
        let user = await this.getUser(email);
        
        if(user !== null){
            throw new ConflictException('Registering cancelled. The user already exists.');
        }
        
        this.userModel.create({
            email: email,
        }).catch((e) => {
            console.log('!!!!!!!!!!!!!!!!!FTO!!!!!!!!!!!!!!!!!',e);
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
