import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/entities/token.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly TokenRepository: Repository<Token>,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async saveToken(hash: string, userId: string) {
    const objToken = await this.TokenRepository.findOne({ userId });
    if (!objToken) {
      this.TokenRepository.insert({
        hash,
        userId,
      });
      return;
    }
    this.TokenRepository.update(objToken.id, { hash });
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.TokenRepository.findOne({ hash: oldToken });
    if (!objToken) {
      throw new HttpException(
        {
          errorMessage: 'Invalid Token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.userService.find(objToken.userId);
    return this.authService.login(user);
  }
}
