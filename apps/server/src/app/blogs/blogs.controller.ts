import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
    constructor(private blogsService: BlogsService){}

    @Get()
    getblogs() {
        return this.blogsService.getBlogs();
    }

    @Post()
    createBlog(@Body() body: any) {
        return this.blogsService.createBlog(body);
    }

    @Put(':id')
    updateBlog(@Param('id') id: any, @Body() body: any) {
        return this.blogsService.updateBlog(id, body);
    }

    @Delete(':id')
    deleteBlog(@Param('id') id) {
        return this.blogsService.deleteBlog(id);
    }
}