import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.mjs';
import { EnvironmentService } from '../environment/environment.service';

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
