import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend ko connect karne ke liye CORS Enable
  app.enableCors({
    origin: '*',
  });

  await app.listen(4000);
  console.log(`Backend server running on http://localhost:4000`);
}
bootstrap();