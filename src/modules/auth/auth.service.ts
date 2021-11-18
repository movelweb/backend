import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import LoginUserDTO from '../users/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { LoginResponse, LoginValidate } from './interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginValidate> {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
  }

  async login(user: LoginUserDTO): Promise<LoginResponse> {
    const userData = await this.usersService.findByEmail(user.email);

    if (!userData) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userData.id) {
      const payload = { email: userData.email, sub: userData.id };
      const token = this.jwtService.sign(payload);
      this.tokenService.saveToken(token, userData.id);
      return {
        access_token: token,
        user: userData,
      };
    }
  }
}
