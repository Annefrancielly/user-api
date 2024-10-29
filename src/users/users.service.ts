import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    async create(nome: string, email: string, senha: string, usuario: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser: User = {
            id: this.idCounter++,
            nome,
            email,
            senha: hashedPassword,
            usuario,
        };

        this.users.push(newUser);
        return newUser;
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: number, nome: string, email: string, senha: string, usuario: string): Promise<User> {
        const user = this.findOne(id);
        const hashedPassword = await bcrypt.hash(senha, 10);

        user.nome = nome;
        user.email = email;
        user.senha = hashedPassword;
        user.usuario = usuario;

        return user;
    }

    remove(id: number): void {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) throw new NotFoundException('User not found');
        this.users.splice(index, 1);
    }
}
