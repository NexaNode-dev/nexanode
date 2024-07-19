import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackendBookingsPresentationModule } from '@nexanode/backend-bookings-presentation';
import { BackendEventsPresentationModule } from '@nexanode/backend-events-presentation';
import { BackendIamPresentationModule } from '@nexanode/backend-iam-presentation';
import { BackendMailerUtilModule } from '@nexanode/backend-mailer-util';
import { BackendMediaPresentationModule } from '@nexanode/backend-media-presentation';
import { BackendServicesPresentationModule } from '@nexanode/backend-services-presentation';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +(process.env.MAIL_PORT || 587),
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.MAIL_DEFAULT,
        to: process.env.MAIL_DEFAULT,
      },
    }),
    BackendIamPresentationModule,
    BackendServicesPresentationModule,
    BackendEventsPresentationModule,
    BackendBookingsPresentationModule,
    BackendMediaPresentationModule,
    BackendMailerUtilModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
