import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { DatabaseModule } from 'src/database/database.module';
import { boardsProviders } from './board.providers';

@Module({
  imports: [DatabaseModule],
  providers: [BoardService, ...boardsProviders],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
