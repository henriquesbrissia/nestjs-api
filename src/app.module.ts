import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    AuthModule,
    DbModule],
})
export class AppModule {}
