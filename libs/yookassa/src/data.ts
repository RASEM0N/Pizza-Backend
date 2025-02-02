import { YookassaPaymentData } from '@pizza/yookassa/yookassa.types';

export const paymentData: YookassaPaymentData = {
	id: '1',
	status: 'payed',
	description: 'Описание',
	created_at: new Date().toString(),
	test: false,
	paid: true,
	refundable: false,

	amount: {
		value: '1000',
		currency: 'rub',
	},

	recipient: {
		account_id: 'account_id',
		gateway_id: 'gateway_id',
	},

	confirmation: {
		type: 'type',
		confirmation_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
	},

	metadata: {
		order_id: '1',
	},
};
