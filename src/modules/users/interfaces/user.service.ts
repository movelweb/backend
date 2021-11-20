import { User } from 'src/entities/user.entity';
import CreateUserDTO from '../dto/create.dto';
import UpdateUserDTO from '../dto/update.dto';
import UpdatePasswordUserDTO from '../dto/updatePassword.dto';

interface IUserService {
  create: (data: CreateUserDTO, userId: any) => Promise<User>;
  update: (id: string, data: UpdateUserDTO, user: any) => Promise<User>;
  setPassword: (id: string, data: UpdatePasswordUserDTO) => Promise<User>;
  find: (id: string, userId: any) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  findAll: (user: any) => Promise<User[]>;
  deactivate: (id: string, userId: any) => unknown;
  activate: (id: string, userId: any) => Promise<User>;
}

export type { IUserService };
