import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend ko connect hone ki permission dein
  app.enableCors({
    origin: 'http://localhost:3000', // Aapka Frontend URL
    credentials: true,
  });

  await app.listen(4000);
  console.log('Backend running on http://localhost:4000');
}
bootstrap();