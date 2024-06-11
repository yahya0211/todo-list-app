import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ListModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
