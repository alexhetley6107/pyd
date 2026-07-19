import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BoardModule } from './board/board.module';
import { JwtAppModule } from './jwt-app/jwt-app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    MailModule,
    BoardModule,
    TaskModule,
    JwtAppModule,
  ],
  controllers: [],
})
export class AppModule {}
