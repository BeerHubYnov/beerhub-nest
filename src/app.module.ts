import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarModule } from './bar/bar.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UserModule, BarModule, EventModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
