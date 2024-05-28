import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userRepo: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest();

    const authHeader = httpRequest.get('Authorization');

    if (!authHeader) {
      return false;
    }

    const [, jwtToken] = authHeader.split(' ');

    if (!jwtToken) {
      return false;
    }

    const userRecord = await this.userRepo.findOne({ token: jwtToken });

    if (!userRecord) {
      return false;
    }

    httpRequest.user = userRecord;

    return true;
  }
}
