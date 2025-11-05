import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private dbService: PrismaService) {}
  getHello() {
    return this.dbService.user.findMany();
  }
}
