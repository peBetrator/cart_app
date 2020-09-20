import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CategoryModule,
    ProductsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:dbUserPassword@cluster0.h5e1r.mongodb.net/test?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
