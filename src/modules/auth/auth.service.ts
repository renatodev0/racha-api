import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable()
export class AuthService {
  private auth: Auth;
  constructor(private jwtService: JwtService) {
    this.auth = getAuth();
  }

  async login(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
    return user;
  }

  async register(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
    return user;
  }
}
