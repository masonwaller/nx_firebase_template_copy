import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
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

    @Get('search')
    getUsersFromSearch(@Query('search') search: any) {
        return this.usersService.getUsersFromSearch(search);
    }

    @Get('realtime-database-example')
    getRealtimeDatabaseExample() {
        return this.usersService.getUsersInRealtimeDatabaseExample();
    }

    @Post('realtime-database-example')
    postRealtimeDatabaseExample(@Body() body: any) {
        return this.usersService.postUserInRealtimeDatabaseExample(body);
    }
}