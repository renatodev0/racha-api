import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idToken = request.headers.authorization?.split(' ')[1];

    if (!idToken) {
      return false;
    }

    const decodedToken = await admin
      .auth()
      .verifyIdToken(idToken)
      .catch((error) => {
        throw new UnauthorizedException('Invalid token', error);
      });

    request.user = decodedToken.email;

    return decodedToken ? true : false;
  }
}
