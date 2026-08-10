import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Aap local MongoDB use kar rahe ho toh mongodb://localhost:27017/taskdb, 
    // ya Atlas Cloud URL pass kar sakte ho.
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb'),
    TasksModule,
  ],
})
export class AppModule {}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
