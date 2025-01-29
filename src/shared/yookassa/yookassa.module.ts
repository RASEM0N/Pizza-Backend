import { DynamicModule, Module } from '@nestjs/common';
import { YookassaService } from './yookassa.service';
import { YookassaModuleAsyncOptions, YookassaModuleOptions } from './yookassa.types';
import { YOOKASSA_CONFIG } from './yookassa.provider';

@Module({
	providers: [YookassaService],
	exports: [YookassaService],
})
export class YookassaModule {
	static forRoot(options: YookassaModuleOptions): DynamicModule {
		return {
			global: options.global,
			module: YookassaModule,
			exports: [YookassaService],
			providers: [
				YookassaService,
				{
					provide: YOOKASSA_CONFIG,
					useValue: options.value,
				},
			],
		};
	}

	static forRootAsync(options: YookassaModuleAsyncOptions): DynamicModule {
		return {
			global: options.global,
			module: YookassaModule,
			exports: [YookassaService],
			providers: [
				YookassaService,
				{
					provide: YOOKASSA_CONFIG,
					useFactory: options.useFactory,
					inject: options.inject,
				},
			],
		};
	}
}
