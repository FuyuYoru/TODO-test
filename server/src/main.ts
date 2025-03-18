import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  const app = await NestFactory.create(
    AppModule,
    // new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  const serverUrl = await app.getUrl();
  console.log(`Сервер запущен на: ${serverUrl}`);
}
bootstrap();
