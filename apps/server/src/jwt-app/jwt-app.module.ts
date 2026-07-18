import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessGuard } from './guard/jwt-access.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

@Global()
@Module({
  imports: [JwtModule.register({})],
  exports: [JwtModule],
  providers: [JwtAccessGuard, JwtRefreshGuard],
})
export class JwtAppModule {}
