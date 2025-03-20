import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes';

dotenv.config();
async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  const app = await NestFactory.create(
    AppModule,
    // new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  const serverUrl = await app.getUrl();
  console.log(`Сервер запущен на: ${serverUrl}`);
}
bootstrap();
