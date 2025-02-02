import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import base64 from 'base-64';
import {
	YookassaConfig,
	YookassaCreatePayment,
	YookassaPaymentData,
} from './yookassa.types';
import { YOOKASSA_CONFIG } from './yookassa.provider';
import { paymentData } from './data';

@Injectable()
export class YookassaService {
	constructor(@Inject(YOOKASSA_CONFIG) private readonly config: YookassaConfig) {}

	async createPayment(data: YookassaCreatePayment): Promise<YookassaPaymentData> {
		if (this.config.fake) {
			return paymentData;
		}

		// https://yookassa.ru/developers/api#create_payment
		const resp = await fetch(this.config.url, {
			body: JSON.stringify({
				amount: {
					value: data.amount.toString(),
					currency: 'RUB',
				},
				capture: true,
				description: data.description,
				metadata: {
					order_id: data.orderId,
				},
				confirmation: {
					type: 'redirect',
					return_url: this.config.callbackUrl,
				},
			}),
			headers: {
				'Idempotence-Key': uuidv4(),
				'Content-Type': 'application/json',

				// -u <Идентификатор магазина>:<Секретный ключ>
				Authorization: `Basic ${base64.encode(`${this.config.storeId}:${this.config.apiKey}`)}`,
			},
		});

		return resp.json();
	}
}
