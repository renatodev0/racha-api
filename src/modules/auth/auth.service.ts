import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { error } from 'console';


@Injectable()
export class AuthService {
  private auth: Auth
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.auth = getAuth();
  }

  async login(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password).catch(error => {
      throw new InternalServerErrorException(error.message)
    })
    return user
  }

  async register(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password).catch(error => {
      throw new InternalServerErrorException(error.message)
    })
    return user
  }
}
