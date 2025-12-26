import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLocalIP } from '@repo/config/src/network';

const PORT = process.env.PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Allow all origins (for development)
    credentials: true,
  });
  // Listen on all network interfaces (0.0.0.0) to allow mobile device access
  await app.listen(PORT, '0.0.0.0');

  const localIP = getLocalIP();

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);

  if (localIP) {
    console.log(`API accessible at: http://${localIP}:${PORT}/graphql`);
  } else {
    console.log(`API accessible on all network interfaces at port ${PORT}`);
  }
}
void bootstrap();
