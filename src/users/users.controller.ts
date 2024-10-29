import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): User[] {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): User {
      return this.usersService.findOne(+id);
    }
  
    @Post()
    async create(
      @Body('nome') nome: string,
      @Body('email') email: string,
      @Body('senha') senha: string,
      @Body('usuario') usuario: string,
    ): Promise<User> {
      return this.usersService.create(nome, email, senha, usuario);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body('nome') nome: string,
      @Body('email') email: string,
      @Body('senha') senha: string,
      @Body('usuario') usuario: string,
    ): Promise<User> {
      return this.usersService.update(+id, nome, email, senha, usuario);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number): void {
      this.usersService.remove(+id);
    }
}
