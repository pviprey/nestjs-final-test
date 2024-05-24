import { ValidationError } from 'sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { Controller, Post, BadRequestException, Body, ConflictException, NotFoundException } from '@nestjs/common';

@Controller()
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @Post()
    async addUser(@Body('email') email: string): Promise<void> {
        let user = await this.getUser(email);
        
        if(user !== null){
            throw new ConflictException('Registering cancelled. The user already exists.');
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            throw new BadRequestException('Registering cancelled. The email is invalid.');
        }

        await this.UserService.addUser(email);
    }

    @Post(':email')
    async getUser(@Body('email') email: string): Promise<User> {
        return await this.UserService.getUser(email);
    }

    async resetData(): Promise<void> {
        return this.UserService.resetData();
    }
}
