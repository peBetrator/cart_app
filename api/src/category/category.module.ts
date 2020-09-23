import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { CategoryResolver } from './category.resolver';
import { CategorySchema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    ProductsModule,
  ],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
