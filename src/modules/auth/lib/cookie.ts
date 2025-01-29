import { Request, Response } from 'express';

const AUTH_COOKIE = 'auth-jwt';

export const setAuthToken = (response: Response, token: string) => {
	response.cookie(AUTH_COOKIE, token, {
		maxAge: 3600 * 1000 * 24 * 30,
		httpOnly: true,
	});
};

export const getAuthToken = (request: Request): string => {
	return request.cookies[AUTH_COOKIE];
};

export const clearAuthToken = (response: Response) => {
	response.clearCookie(AUTH_COOKIE);
};
