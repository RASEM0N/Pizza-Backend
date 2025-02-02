import { ModuleMetadata } from '@nestjs/common';

export interface YookassaConfig {
	url: string;
	callbackUrl: string;
	storeId: string;
	apiKey: string;
	fake?: boolean;
}

export interface YookassaModuleOptions extends Pick<ModuleMetadata, 'imports'> {
	global?: boolean;
	value: YookassaConfig;
}

export interface YookassaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	global?: boolean;
	inject?: any[];
	useFactory?: (...args: any[]) => Promise<YookassaConfig> | YookassaConfig;
}

export interface YookassaCreatePayment {
	amount: number;
	description: string;
	orderId: string;
}

export interface YookassaPaymentCallback {
	type: string;
	event: string;
	object: {
		id: string;
		status: string;
		amount: { value: string; currency: string };
		income_amount: { value: string; currency: string };
		description: string;
		recipient: { account_id: string; gateway_id: string };
		payment_method: {
			type: string;
			id: string;
			saved: boolean;
			title: string;
		};
		captured_at: string;
		created_at: string;
		test: boolean;
		refunded_amount: { value: string; currency: string };
		paid: boolean;
		refundable: true;
		metadata: { order_id: string };
		authorization_details: {
			rrn: string;
			auth_code: string;
		};
	};
}

export interface YookassaPaymentData {
	id: string;
	status: string;
	description: string;
	created_at: string;
	test: boolean;
	paid: boolean;
	refundable: boolean;
	amount: {
		value: string;
		currency: string;
	};
	recipient: {
		account_id: string;
		gateway_id: string;
	};
	confirmation: {
		type: string;
		confirmation_url: string;
	};
	metadata: {
		order_id: string;
	};
}
