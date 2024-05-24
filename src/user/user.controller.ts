import { User } from './user.model';
import { UserService } from './user.service';
import { Controller, Post, Param, BadRequestException } from '@nestjs/common';

@Controller()
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @Post()
    async addUser(@Param('email') email: string): Promise<void> {

        console.log('!!!!!!!!!!!!!!FTO!!!!!!!!!!!!!!', );

        if(email === undefined){
            throw new BadRequestException('Registration cancelled. The email is not specified.');
        }

        this.UserService.addUser(email);
    }

    @Post(':email')
    async getUser(@Param('email') email: string): Promise<User> {
        try{
            return this.UserService.getUser(email);
        } catch (e) {
            console.log(e);
        }
    }

    async resetData(): Promise<void> {
        return this.UserService.resetData();
    }
}
