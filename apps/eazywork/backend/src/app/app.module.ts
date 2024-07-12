import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BackendIamPresentationModule } from '@nexanode/backend-iam-presentation';
import { BackendJobOffersPresentationModule } from '@nexanode/backend-job-offers-presentation';
import { BackendMediaPresentationModule } from '@nexanode/backend-media-presentation';
import { BackendOrganisationsPresentationModule } from '@nexanode/backend-organisations-presentation';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['./entities/*.entity.{ts,js}'],
      synchronize: false,
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'development',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'admin', 'browser'),
      serveRoot: '/admin',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'browser'),
      exclude: [ '/admin/*' ],
    }),
    EventEmitterModule.forRoot(),
    BackendIamPresentationModule,
    BackendMediaPresentationModule,
    BackendOrganisationsPresentationModule,
    BackendJobOffersPresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
