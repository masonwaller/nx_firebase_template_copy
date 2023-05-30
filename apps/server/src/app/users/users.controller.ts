import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    signInUser(@Body() body: any) {
        return this.usersService.signInUser(body);
    }

    @Put()
    updateUser(@Body() body: any) {
        return this.usersService.updateUserData(body);
    }
}