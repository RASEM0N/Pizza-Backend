import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from '@/modules/cart/cart.module';

// @TODO страноватый модуль какой-то
// надо переработать
@Module({
	imports: [CartModule],
	providers: [OrderService],
	exports: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
