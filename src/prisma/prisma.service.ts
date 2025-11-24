import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { EnvironmentService } from '../environment/environment.service';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private environmentService: EnvironmentService) {
    const adapter = new PrismaPg({
      connectionString: environmentService.dbConnectionString,
    });

    super({ adapter });
  }

  public async onModuleInit() {
    await this.$connect();
  }
}
