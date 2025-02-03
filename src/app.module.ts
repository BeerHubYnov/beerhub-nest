import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarModule } from './bar/bar.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AssessmentModule } from './assessment/assessment.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    BarModule,
    EventModule,
    FavoriteModule,
    AssessmentModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
