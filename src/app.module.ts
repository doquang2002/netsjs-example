import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './modules/upload/upload.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        synchronize: true,
        autoLoadEntities: true,
        migrationsRun: true,
        entities: ['dist/**/*.entity.{ts,js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
        retryAttempts: 5,
        timezone: '+07:00',
        charset: 'utf8mb4_unicode_ci',
        dropSchema:true,
        legacySpatialSupport: false,
      }),
    }),
    UploadModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
